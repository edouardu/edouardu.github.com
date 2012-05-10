#!/usr/bin/env ruby
# encoding: utf-8
require 'sinatra/base'

begin
  require 'psych'
rescue LoadError
end
  
require 'dm-core'
require 'dm-transactions'
require 'dm-adjust'
require 'dm-aggregates'

require 'erubis'
require 'fileutils'
require 'json'
require 'logger'
require 'ostruct'
require 'redsquare'

Encoding.default_external = Encoding::UTF_8

class Redsquare::Render::Strip < Redsquare::Render::Base
  def block_code(code, language); code end
  def block_quote(quote); quote end
  def block_html(raw_html); '' end
  def header(text, header_level); text end
  def list(contents, list_type); ' ' + contents end
  def list_item(text, list_type); text end
  def paragraph(text); text end
  def linebreak(); ' ' end
  def codespan(code); code end
  def double_emphasis(text); text end
  def emphasis(text); text end
  def triple_emphasis(text); text end
  def strikethrough(text); text end
  def superscript(text); text end
  def underline(text); text end
  def spoiler(text); '(spoilers)' end
  def raw_html(raw_html); '' end
end

class Hive < Sinatra::Base  
  include Redsquare
  
  Tilt.register Tilt::ErubisTemplate, 'html'
  
  set :erb, engine_class: Erubis::FastEruby
  
  configure do |c|
    defaults = {
      cache: true,
      
      locale: 'en',
      
      app_name: 'neetBBS',
      
      tripsalt: '',
      
      anon: 'Anonymous',
      
      topic_limit: 200,
      post_limit: 500,
      
      head_size: 50,
      tail_size: 50,
      
      author_length: 50,
      title_length: 70,
      comment_length: 3000,
      comment_lines: 100,
      
      excerpt_length: 150,
      
      delay_topic: 60,
      delay_reply: 15,
      delay_auth: 15,
      
      auth_ttl: 3600,
      
      authlog_age: 86400,
      
      protection: false,
      
      markdown: {
        strikethrough: true,
        underline: true,
        spoiler: true,
        freeze_html: true,
        no_intra_emphasis: true,
        fenced_code_blocks: true,
        humble: true
      }
    }
    
    config_file = 
      if settings.environment == :test
        'config_test.rb'
      else
        'config.rb'
      end
    
    config = eval(
      File.open(File.join(settings.root, 'config', config_file), 'r') { |f|
        "{#{f.read}}"
      }
    )
    
    defaults.merge!(config[:settings])
    
    set defaults
    
    if settings.environment == :development
      require 'sinatra/reloader'
      register Sinatra::Reloader
      DataMapper::Logger.new($stdout, :debug)
    else
      set :static, false
    end
    
    set :frags_folder, File.join(settings.root, 'frags') if settings.cache
    
    @@logger = Logger.new(File.join(settings.root, 'log', 'error.log'), 3, 512000)
    
    require File.join(settings.root, 'models.rb')
    
    DataMapper.setup(:default, config[:database])
  end
  
  # Translations
  @@i18n = OpenStruct.new(
    eval File.open("#{settings.root}/i18n/#{settings.locale}.rb",
      'r:UTF-8') { |f| "{#{f.read}}" }
  )
  def t; @@i18n end
  
  # Markdown parser
  @@md = Markdown.new(Render::HTML.new(hard_wrap: true), settings.markdown)
  @@md_strip = Markdown.new(Render::Strip, settings.markdown.merge({ freeze_html: false }))
  def md; @@md end
  
  def make_tripcode(str)
    [OpenSSL::Digest.digest('MD5', settings.tripsalt + str)[0, 9]].pack('m0')    
  end
  
  def validate_email(s)
    (s && !!(s =~ /^[-._a-z0-9]+@[-._a-z0-9]+$/i) && s.length < 254) ? s : false
  end
  
  def validate_digit(s)
    (s && !!(s =~ /^[0-9]{1}$/)) ? s.to_i : false
  end
  
  def validate_slug(s)
    (s && !!(s =~ /^[a-z0-9]{1,15}$/)) ? s : false
  end
  
  def validate_boardtitle(s)
    (s && s.length > 0 && s.length <= 50) ? @@md.escape_html(s) : false
  end
  
  def validate_ip(s)
    (s && !!(s =~ /^[0-9]{1,3}(\.[0-9]{1,3}){3}$/)) ? s : false
  end
  
  def maybe_int(s)
    ((i = s.to_i).to_s == s) ? i : s
  end
  
  def cache_page(template)
    return erb template unless settings.cache
    buffer = erb template
    cache_dir = File.join(settings.public_folder, request.path_info)
    if !File.directory?(cache_dir)
      FileUtils.mkdir_p(cache_dir)
    end
    File.open(File.join(cache_dir, 'index.html'), 'w') do |f|
      f.write(buffer)
    end
    buffer
  end
  
  def cache_sweep(path_info)
    return unless settings.cache
    file = File.join(settings.public_folder, path_info, 'index.html')
    FileUtils.rm(file) if File.exists?(file)
  end
  
  def cache_purge(path_info)
    return unless settings.cache
    dir = File.join(settings.public_folder, path_info)
    FileUtils.rm_r(dir) if File.directory?(dir)
  end

  def cache_frag(id, &block)
    (yield; return) unless settings.cache
    frag = settings.frags_folder + "/#{id}"
    if File.exists?(frag)
      @_out_buf << File.open(frag, 'r') { |f| f.read }
    else
      @_out_buf, old_buffer = '', @_out_buf
      yield
      File.open(frag, 'w') { |f| f.write @_out_buf }
      @_out_buf = old_buffer + @_out_buf
    end
  end
  
  def frag_sweep(id)
    return unless settings.cache
    frag = settings.frags_folder + "/#{id}"
    FileUtils.rm(frag) if File.exists?(frag)
  end
  
  def frag_purge
    return unless settings.cache
    Dir.glob(settings.frags_folder + '/*').each do |frag|
      FileUtils.rm_f(frag)
    end
  end
  
  def fail(msg, code = nil)
    status code if code
    if request.xhr?
      content_type :json
      halt ({ status: :error, message: msg, code: code }).to_json
    else
      @msg, @code = msg, code
      halt erb :error
    end
  end
  
  def success(msg, redirect = nil)
    if request.xhr?
      content_type :json
      ({ status: :success, message: msg }).to_json
    else
      @msg = msg
      @redirect = redirect
      erb :success
    end
  end
  
  def get_auth
    token = request.cookies['htkn'].to_s
    
    if token.empty? || !(user = User.first(token: token, ip: request.ip))
      return false
    end
    
    now = Time.now.utc.to_i
    
    if user.timestamp < (now - settings.auth_ttl)
      response.set_cookie('htkn', value: '', path: '/')
      user.update!(token: nil)
      return false
    end
    
    user.update!(timestamp: now)
    
    user
  end
  
  def random_hexbytes(length)
    OpenSSL::Random.random_bytes(length).unpack("H*")[0]
  end
  
  get '/' do
    @boards = Board.all
    cache_page :index
  end
  
  get %r{^/([0-9a-z]+)/?$} do |slug|
    @board = Board.first(slug: slug)
    halt 404 if !@board
    
    @topics = Topic.all(
      board_id: @board.id,
      limit: settings.topic_limit,
      order: :touch.desc
    )
    
    cache_page :board
  end
  
  get %r{^/([0-9a-z]+)/read/([0-9]+)(/[a-z]+)?/?$} do |slug, num, range|
    @board = Board.first(slug: slug)
    
    halt 404 if !@board
    
    @topic = Topic.first(board_id: @board.id, num: num)
    
    halt 404 if !@topic
    
    if range && range == '/inspect'
      fail t.authfail unless (@user = get_auth) && @user.is_janitor?
      @posts = Post.all(topic_id: @topic.id)
      return erb :inspect
    end
    
    @posts =
      if range && @topic.post_count > settings.head_size
        if range == '/head'
          Post.all(topic_id: @topic.id, limit: settings.head_size)
        else
          replies = Post.all(
            topic_id: @topic.id,
            limit: settings.tail_size,
            order: :id.desc
          )
          # heh
          replies.empty?
          replies.reverse!
          op = Post.all(topic_id: @topic.id, num: 1)
          op.empty?
          op + replies
        end
      else
        Post.all(topic_id: @topic.id)
      end
    
    cache_page :read
  end

  post '/post' do
    halt if params['email'] && params['email'].length > 0
    
    board = Board.get(params['board_id'])
    
    fail t.badboard if !board
    
    if @ban = Ban.first(ip: request.ip)
      if @ban.expired?
        @ban.destroy!
      else
        halt erb :banned if @ban
      end
    end
    
    now = Time.now.utc.to_i
    
    throttle = now -
      if !params['topic_num']
        settings.delay_topic
      else
        settings.delay_reply
      end
    
    if Post.first(ip: request.ip, :timestamp.gt => throttle)
      fail t.fastpost
    end
    
    author = params['author'] || ''
    
    if author.include?('#')
      author, tripcode = author.split('#', 2)
      tripcode = make_tripcode(tripcode) if tripcode
      author ||= ''
    end
    
    if params['authpost'] || params['allow_html']
      fail t.nope unless (user = get_auth)
      tripcode = t.userlevel[user.rank] if params['authpost']
    end
    
    author = author.gsub(/[^[:print:]]/u, '').strip
    
    if author.length > 0
      fail t.longname if author.length > settings.author_length
      author = @@md.escape_html(author)
    else
      author = nil
    end
    
    if !params['comment'] || !(/[[:graph:]]/u =~ params['comment'])
      fail t.nocomment
    end
    
    comment = params['comment'].strip
    
    fail t.nocomment if comment.length == 0
    
    unless user && user.is_admin?
      fail t.longcomment if comment.lines.count > settings.comment_lines
      fail t.longcomment if comment.length > settings.comment_length
    end
    
    if params['aa']
      excerpt = t.aaexcerpt if !params['topic_num']
      comment = '<p class="aa">' << @@md.escape_html(comment).gsub(/\r\n|\r|\n/, '<br>') << '</p>'
    elsif params['nomd']
      if !params['topic_num']
        excerpt = @@md.escape_html(comment.gsub(/(\r|\n)+/, ' ')[0, settings.excerpt_length])
      end
      comment = '<p>' << @@md.escape_html(comment).gsub(/(\r|\n)+/, '<br>') << '</p>'
    else
      if !params['topic_num']
        excerpt = @@md.escape_html(
          @@md_strip.render(comment.gsub(/(\r|\n)+/, ' '))[0, settings.excerpt_length]
        )
      end
      if params['allow_html'] && user.is_admin?
        admin_md_opts = settings.markdown.clone
        admin_md_opts[:freeze_html] = false
        comment = Markdown.new(Render::HTML.new(hard_wrap: true), admin_md_opts).render(comment)
      else
        comment = @@md.render(comment)
      end
    end
    
    comment.gsub!(/(&gt;&gt;([0-9]+))/, '<a href="#\2">\1</a>')
    
    if !params['topic_num']
      fail t.notitle if !params['title']
      title = params['title'].gsub(/[^[:print:]]/u, '').strip
      fail t.notitle if title.length == 0
      title = @@md.escape_html(title)
      fail t.longtitle if title.length > settings.title_length
    else
      topic = Topic.first(board_id: board.id, num: params['topic_num'])
      fail t.nothread if !topic
      fail t.threadlocked if topic.post_count >= settings.post_limit
    end
    
    post = Post.new
    
    Post.transaction do
      if !params['topic_num']
        topic = Topic.new
        topic.board_id = board.id
        topic.num = board.topic_count + 1
        topic.touch = now
        topic.timestamp = now
        topic.author = author
        topic.tripcode = tripcode
        topic.ip = request.ip
        topic.title = title
        topic.excerpt = excerpt
        topic.save!
        board.adjust!(topic_count: 1)
      else
        if params['sage']
          topic.update!(post_count: topic.post_count + 1)
        else
          topic.update!(post_count: topic.post_count + 1, touch: now)
        end
      end
      
      @topic_num = topic.num.to_s
      @board_slug = board.slug
      
      post.board_id = board.id
      post.topic_id = topic.id
      post.num = topic.post_count
      post.timestamp = now
      post.author = author
      post.tripcode = tripcode
      post.ip = request.ip
      post.comment = comment
      post.save!
    end
    
    cache_sweep board.slug
    
    if post.num > 1
      cache_purge "/#{board.slug}/read/#{topic.num}"
    else
      purge_below = Topic.first(
        fields: [ :touch ],
        order: :touch.desc,
        offset: settings.topic_limit + 1
      )
      if purge_below
        pushed = Topic.all(fields: [ :id ], :touch.lte => purge_below.touch)
        pushed.each do |topic|
          cache_purge "/#{board.slug}/read/#{topic.num}"
        end
        Topic.all(:touch.lte => purge_below.touch).destroy!
      end
    end
    
    erb :post
  end

  get %r{^/([0-9a-z]+)/delete/([0-9]+)(?:/([0-9]+))?$} do |slug, t_num, p_num|
    fail t.authfail unless (@user = get_auth) && @user.is_janitor?
    
    board = Board.first(slug: slug)
    fail t.badboard if !board
    
    topic = Topic.first(board_id: board.id, num: t_num)
    fail t.badtopic if !topic
    
    if p_num && p_num != '1'
      post = Post.first(topic_id: topic.id, num: p_num)
      fail t.badpost if !post
      post.destroy!
    else
      Post.transaction do
        Post.all(topic_id: topic.id).destroy!
        topic.destroy!
      end
      cache_sweep board.slug
    end
    
    cache_purge "#{board.slug}/read/#{topic.num}"
    
    success t.done
  end
  
  get '/manage/help/?' do
    cache_page :help
  end
  
  get '/manage/home' do
    erb (@user = get_auth) ? :manage : :login
  end
  
  post '/manage/login' do
    if params['email'].to_s.empty? || params['password'].to_s.empty?
      fail t.authfail, 403
    end
    
    now = Time.now.utc.to_i
    
    AuthFail.all(:timestamp.lt => now - settings.authlog_age).destroy!
    
    if AuthFail.first(ip: request.ip, :timestamp.gt => now - settings.delay_auth)
      fail t.fastauth, 403
    end
    
    user = User.first(email: params['email'])
    if !user || user.password != params['password']
      AuthFail.create!(ip: request.ip, timestamp: now)
      fail t.authfail, 403
    end
    
    token = random_hexbytes(16)
    user.update!(timestamp: now, ip: request.ip, token: token)
    response.set_cookie('htkn', value: token, path: '/')
    redirect '/manage/home'
  end
  
  get '/manage/logout' do
    token = request.cookies['htkn']
    fail t.noauth if !token || token.empty?
    User.all(ip: request.ip, token: token).update!(token: nil)
    response.set_cookie('htkn', value: '', path: '/')
    redirect '/'
  end
  
  get %r{^/manage/bans(?:/([a-z]+))?(?:/([0-9]+))?$} do |action, id|
    fail t.authfail unless (@user = get_auth) && @user.is_mod?
    if !action
      @bans = Ban.all(limit: 50)
      @bancount = Ban.count
      erb :managebans
    elsif action == 'add' && id
      @post = Post.get(id)
      fail t.badpost if !@post
      fail t.banexists if Ban.first(ip: @post.ip)
      erb :addban
    elsif action == 'delete' && id
      ban = Ban.get(id)
      fail t.badban if !ban
      ban.destroy!
      success t.done
    else
      halt 404
    end
  end
  
  post '/manage/bans/find' do
    fail t.authfail unless (user = get_auth) && user.is_mod?
    
    if params['ip']
      @ban = Ban.first(ip: params['ip'])
      fail t.noresults if !@ban
      if @ban.expired?
        @ban.destroy!
        fail t.noresults
      end
      @issuer = User.get(@ban.issuer_id)
      erb :managebans
    else
      fail t.noresults
    end
  end
  
  post '/manage/bans/add' do
    fail t.authfail unless (user = get_auth) && user.is_mod?
    
    fail t.badip unless ip = validate_ip(params['ip'])
    fail t.banexists if Ban.first(ip: ip)
    duration = params['duration'].to_i
    fail t.badbanlength unless duration > 0 && duration < 1000
    fail t.nobanreason if (reason = params['reason'].strip) .empty?
    
    reason = @@md.escape_html(reason)
    duration *= Ban::UNIT
    
    now = Time.now.utc.to_i
    
    Ban.create!(
      issuer_id: user.id,
      timestamp: now,
      reason: reason,
      ip: ip,
      expires_on: now + duration
    )
    
    success t.done
  end

  get %r{^/manage/users(?:/([a-z]+))?(?:/([0-9]+))?$} do |action, id|
    fail t.authfail unless (@user = get_auth) && @user.is_admin?
    
    if !action
      @users = User.all
      erb :manageusers
    elsif action == 'add'
      erb :adduser
    elsif action == 'edit' && id
      fail t.baduser unless @target = User.get(id)
      fail t.nope if @target.id != @user.id && @target.is_admin?
      erb :edituser
    elsif action == 'delete' && id
      fail t.baduser unless target = User.get(id)
      fail t.nope if target.id == @user.id || target.is_admin?
      target.destroy!
      success t.done
    elsif action == 'reset' && id
      fail t.baduser unless target = User.get(id)
      fail t.nope if target.is_admin?
      new_password = random_hexbytes(8)
      target.update!(password: new_password, token: nil)
      success t.passwdreset + new_password
    else
      halt 404
    end
  end
  
  post '/manage/users/edit/:id' do |id|
    fail t.authfail unless (user = get_auth) && user.is_admin?
    
    fail t.baduser unless target = User.get(id)
    fail t.badlevel unless level = validate_digit(params['level'])
    
    target.update!(level: level)
    
    success t.done
  end
  
  post '/manage/users/add' do
    fail t.authfail unless (user = get_auth) && user.is_admin?
    
    fail t.bademail unless email = validate_email(params['email'])
    fail t.badlevel unless level = validate_digit(params['level'])
    
    password = random_hexbytes(8)
    
    User.create!(email: email, level: level, password: password)
    
    success t.passwdreset + password
  end
  
  get '/manage/profile' do
    fail t.authfail unless @user = get_auth
    erb :editprofile
  end
  
  post '/manage/profile' do
    fail t.authfail unless @user = get_auth
    
    up = {}
    
    if params['new_passwd'] && !params['new_passwd'].empty?
      if @user.password != params['old_password']
        user.update!(token: nil)
        response.set_cookie('htkn', value: '', path: '/')
        fail t.authfail, 403
      end
      fail t.diffpasswd if params['new_passwd'] != params['confirm_passwd']
      fail t.shortpasswd if params['new_passwd'].length < 8
      up[:password] = params['new_passwd']
    end
    
    fail t.bademail unless up[:email] = validate_email(params['email'])
    
    @user.update!(up) unless up.empty?
    
    success t.done
  end
  
  get '/manage/cache/sweep' do
    fail t.authfail unless (@user = get_auth) && @user.is_admin?
    Board.all.each do |board|
      cache_purge board.slug
    end
    frag_purge
    cache_purge 'manage'
    cache_sweep '/'
    success t.done
  end
  
  get %r{^/manage/boards(?:/([a-z]+))?(?:/([0-9]+))?$} do |action, id|
    fail t.authfail unless (@user = get_auth) && @user.is_admin?
    if !action
      @boards = Board.all
      erb :manageboards
    elsif action == 'edit' && id
      fail t.badboard unless @board = Board.get(id)
      erb :addeditboard
    elsif action == 'add'
      erb :addeditboard
    elsif action == 'delete' && id
      board = Board.get(id)
      fail t.badboard if !board
      Board.transaction do
        board.destroy!
        Topic.all(board_id: board.id).destroy!
        Post.all(board_id: board.id).destroy!
        frag_sweep :boards_nav
        cache_purge board.slug
        cache_sweep '/'
      end
      success t.done
    else
      halt 404
    end
  end
  
  post %r{^/manage/boards/([a-z]+)(?:/([0-9]+))?$} do |action, id|
    fail t.authfail unless (@user = get_auth) && @user.is_admin?
    
    fields = {}
    
    fail t.badslug unless fields[:slug] = validate_slug(params['slug'])
    fail t.badtitle unless fields[:title] = validate_boardtitle(params['title'])
    fail t.badstatus unless fields[:status] = validate_digit(params['status'])
    
    if params['optkeys'] && params['optvals'] &&
        params['optkeys'].kind_of?(Array) && params['optvals'].kind_of?(Array)
      fields[:options] = {}
      for i in 0..params['optkeys'].length
        break unless params['optvals'][i]
        next if params['optkeys'][i].empty? || params['optvals'][i].empty?
        fields[:options][params['optkeys'][i]] =
          if params['optvals'][i] == 'false'
            false
          elsif params['optvals'][i] == 'true'
            true
          else
            maybe_int(params['optvals'][i])
          end
      end
    end
    
    if action == 'add'
      Board.create!(fields)
      frag_sweep :boards_nav
      cache_sweep '/'
    elsif action == 'edit'
      fail t.badboard unless board = Board.get(id)
      old_slug = board.slug
      board.update!(fields)
      purge_board_cache old_slug
    else
      halt 404
    end
    
    success t.done
  end
  
  not_found do
    erb :not_found
  end

  error DataObjects::Error do
    @@logger.error env['sinatra.error'].message
    fail t.dberror, 500
  end

  error do
    @@logger.error env['sinatra.error'].message
    fail 'Internal Server Error', 500
  end
  
  run! if app_file == $0
end
