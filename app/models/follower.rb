class Follower < ActiveRecord::Base
  validates :user_id, :follower_id, presence: true

  # This either follows or unfollows, depending on the boolean
  def self.follow(profile, follower)
    # accept objects or integer ID's
    user_id  = profile.to_param
    follower_id = follower.to_param

    logger.debug "[Follower] INSERT follower_id=#{follower_id} for user_id=#{user_id}"
    r = where(user_id: user_id, follower_id: follower_id).first
    if r.nil? and create(user_id: user_id, follower_id: follower_id).valid?
      # Profile.increment_counter(:num_followers, user_id)
      # Profile.increment_counter(:num_following, follower_id)
    end
  end

  # This either follows or unfollows, depending on the boolean
  def self.unfollow(profile, follower)
    # accept objects or integer ID's
    user_id  = profile.to_param
    follower_id = follower.to_param

    # just delete, no reason to check, deleting NULL is ok
    logger.debug "[Follower] DELETE follower_id=#{follower_id} for user_id=#{user_id}"
    n = delete_all(user_id: user_id, follower_id: follower_id)
    if n > 0
      # Profile.decrement_counter(:num_followers, user_id)
      # Profile.decrement_counter(:num_following, follower_id)
    end
  end
end
