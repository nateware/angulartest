class FollowersController < ApplicationController
  def index
    @followers = Follower.where(user_id: 1).pluck(:follower_id)
    render json: @followers
  end
end
