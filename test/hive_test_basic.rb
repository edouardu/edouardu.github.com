#!/usr/bin/env ruby
# encoding: utf-8
ENV['RACK_ENV'] = 'test'

require '../hive.rb'
require 'dm-migrations'
require 'test/unit'
require 'rack/test'

class HiveTest < Test::Unit::TestCase
  include Rack::Test::Methods
  
  def app
    Hive
  end
  
  def setup
    app.settings.cache = false
    
    DataMapper.auto_migrate!
    
    Board.create(slug: 'unit', title: 'Test Cases', topic_count: 2)
    
    now = Time.now.utc.to_i
    
    Topic.create(
      board_id: 1,
      num: 1,
      timestamp: now,
      touch: now,
      author: 'Hive',
      tripcode: 'TEST',
      ip: '0.0.0.0', 
      title: 'Range test thread',
      excerpt: 'Range test thread',
      post_count: app.settings.post_limit
    )
    for num in 1..app.settings.post_limit
      Post.create(
        board_id: 1,
        topic_id: 1,
        num: num,
        timestamp: now,
        author: 'Hive',
        tripcode: 'TEST',
        ip: '0.0.0.0', 
        comment: "Test post (\##{num})"
      )
    end
    
    Topic.create(
      board_id: 1,
      num: 2,
      timestamp: now,
      touch: now,
      author: 'Hive',
      tripcode: 'TEST',
      ip: '0.0.0.0', 
      title: 'Basic test thread',
      excerpt: 'Basic test thread',
      post_count: 1
    )
    Post.create(
      board_id: 1,
      topic_id: 2,
      num: 1,
      timestamp: now,
      author: 'Hive',
      tripcode: 'TEST',
      ip: '0.0.0.0', 
      comment: "Test post"
    )
  end
  
  def test_show_index
    get '/'
    assert last_response.ok?
  end
  
  def test_show_board
    get '/unit/'
    assert last_response.ok?
  end
  
  def test_404_board
    get '/nope/'
    assert last_response.not_found?
  end
  
  def test_show_thread_all_posts
    get '/unit/read/1'
    assert last_response.body.include?('Test post (#1)'), "Can't find first post"
    assert last_response.body.include?("Test post (\##{app.settings.post_limit})"),
      "Can't find post number #{app.settings.post_limit}"
  end
  
  def test_show_thread_head_posts
    get '/unit/read/1/head'
    assert last_response.body.include?('Test post (#1)'), "Can't find first post"
    assert last_response.body.include?("Test post (\##{app.settings.head_size})"),
      "Can't find post number #{app.settings.head_size}"
  end
  
  def test_show_thread_tail_posts
    get '/unit/read/1/tail'
    assert last_response.body.include?('Test post (#1)'), "Can't find first post"
    post_2 = app.settings.post_limit - app.settings.tail_size + 1
    if post_2 != 2
      assert !last_response.body.include?('Test post (#2)'), "Found post number 2"
    end
    assert last_response.body.include?("Test post (\##{post_2})"),
      "Can't find post number #{post_2}"
  end
  
  def test_404_thread
    get '/unit/read/9999'
    assert last_response.not_found?
  end
  
  def test_post_thread
    post '/post', {
      'board_id' => 1,
      'title' => 'Auto test thread',
      'comment' => 'Auto test thread'
    }
    assert last_response.body.include?('success'), last_response.body
  end
  
  def test_post_reply_basic
    post '/post', {
      'board_id' => 1,
      'topic_num' => 2,
      'comment' => 'test_post_reply_basic'
    }
    assert last_response.body.include?('success'), last_response.body
  end
  
  def test_post_overflow_author
    post '/post', {
      'board_id' => 1,
      'topic_num' => 2,
      'author' => 'x' * (app.settings.author_length + 1),
      'comment' => 'test_post_overflow_author'
    }
    assert last_response.body.include?('error')
  end
  
  def test_post_overflow_comment_chars
    post '/post', {
      'board_id' => 1,
      'topic_num' => 2,
      'comment' => 'x' * (app.settings.comment_length + 1),
    }
    assert last_response.body.include?('error')
  end
  
  def test_post_empty_comment_chars
    post '/post', {
      'board_id' => 1,
      'topic_num' => 2,
      'comment' => '',
    }
    assert last_response.body.include?('error')
  end
  
  def test_post_overflow_comment_lines
    post '/post', {
      'board_id' => 1,
      'topic_num' => 2,
      'comment' => "x\n" * (app.settings.comment_lines + 1),
    }
    assert last_response.body.include?('error')
  end
  
  def test_post_overflow_title
    post '/post', {
      'board_id' => 1,
      'title' => 'x' * (app.settings.title_length + 1),
      'comment' => 'test_post_overflow_title'
    }
    assert last_response.body.include?('error')
  end
    
  def test_post_empty_title
    post '/post', {
      'board_id' => 1,
      'title' => '',
      'comment' => 'test_post_overflow_title'
    }
    assert last_response.body.include?('error')
  end
    
end