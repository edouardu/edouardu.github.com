#!/usr/bin/env ruby

require 'dm-core'
require 'dm-migrations'
require_relative 'models.rb'

DataMapper::Logger.new($stdout, :debug)

config = eval File.open('.config/config.rb', 'r:UTF-8') { |f| "{#{f.read}}" }

DataMapper.setup(:default, config[:database])

DataMapper.auto_migrate!

User.create(email: 'admin', password: 'admin', level: User::Level::ADMIN)