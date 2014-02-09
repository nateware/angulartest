class Follower < ActiveRecord::Base
  # This either follows or unfollows, depending on the boolean
  def self.follow(profile, follower, follow=true)
    # accept objects or integer ID's
    user_id  = profile.to_param
    follower_id = follower.to_param

    if follow.nil? or follow == "false" or follow == false
      # just delete, no reason to check, deleting NULL is ok
      logger.debug "[Follower] follow=#{follow.inspect}: DELETE follower_id=#{follower_id} for user_id=#{user_id}"
      n = delete_all(user_id: user_id, follower_id: follower_id)
      if n > 0
        # Profile.decrement_counter(:num_followers, user_id)
        # Profile.decrement_counter(:num_following, follower_id)
      end
    else
      logger.debug "[Follower] follow=#{follow.inspect}: INSERT follower_id=#{follower_id} for user_id=#{user_id}"
      r = where(user_id: user_id, follower_id: follower_id).first
      if r.nil? and create(user_id: user_id, follower_id: follower_id).valid?
        # Profile.increment_counter(:num_followers, user_id)
        # Profile.increment_counter(:num_following, follower_id)
      end
    end
  end
end
