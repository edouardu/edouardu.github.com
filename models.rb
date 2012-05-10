require 'dm-types/json'
require 'dm-types/bcrypt_hash'

DataMapper::Model.raise_on_save_failure = true

class Board
  include DataMapper::Resource
  
  module Status
    OPEN    = 1
    FROZEN  = 2
    LOCKED  = 3
  end
  
  property :id,           Serial
  property :slug,         String,   unique_index: true, length: 15
  property :title,        String
  property :topic_count,  Integer,  default: 0
  property :options,      Json,     default: {}, lazy: false
  property :status,       Integer,  default: 1
end

class Topic
  include DataMapper::Resource

  property :id,           Serial
  property :board_id,     Integer,  unique_index: :uid
  property :num,          Integer,  unique_index: :uid
  property :timestamp,    Integer
  property :touch,        Integer,  index: true
  property :author,       String,   length: 255
  property :tripcode,     String
  property :ip,           String,   index: true
  property :title,        String,   length: 255
  property :excerpt,      String,   length: 255
  property :post_count,   Integer,  default: 1
end

class Post
  include DataMapper::Resource
  
  property :id,           Serial
  property :board_id,     Integer
  property :topic_id,     Integer,  index: true
  property :num,          Integer,  index: true, default: 1
  property :timestamp,    Integer
  property :author,       String
  property :tripcode,     String
  property :ip,           String,   index: true
  property :comment,      Text,     lazy: false
end

class User
  include DataMapper::Resource
  
  module Level
    VIP      = 0
    JANITOR  = 1
    MOD      = 2
    ADMIN    = 9
  end
  
  def is_janitor?
    level >= Level::JANITOR
  end
  
  def is_mod?
    level >= Level::MOD
  end
  
  def is_admin?
    level >= Level::ADMIN
  end
  
  @level_map = {}
  
  self::Level.constants.each do |c|
    @level_map[self::Level.const_get(c)] = c
  end
  
  def self.level_map
    @level_map
  end
  
  def rank
    self.class.level_map[level]
  end
  
  property :id,           Serial
  property :level,        Integer,    default: 0
  property :email,        String,     unique_index: true, length: 254
  property :password,     BCryptHash
  property :timestamp,    Integer,    default: 0
  property :ip,           String,     index: :ssid
  property :token,        String,     index: :ssid, length: 32
end

class Ban
  include DataMapper::Resource
  
  UNIT    = 86400
  
  def expired?
    expires_on <= Time.now.utc.to_i
  end
  
  property :id,           Serial
  property :issuer_id,    Integer
  property :timestamp,    Integer,  default: 0
  property :reason,       String
  property :ip,           String,   unique_index: true
  property :expires_on,   Integer,  default: 0, index: true
end

class AuthFail
  include DataMapper::Resource
  
  property :id,           Serial
  property :ip,           String,   index: true
  property :timestamp,    Integer,  index: true
end

DataMapper.finalize
