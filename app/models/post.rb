class Post < ActiveRecord::Base
  validates :user_id, inclusion: {in: 1..2}
  belongs_to :user
end
