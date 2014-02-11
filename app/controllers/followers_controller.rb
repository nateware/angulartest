class FollowersController < ApplicationController
  respond_to :json

  def index
    @followers = Follower.where(user_id: current_user).pluck(:follower_id)
    render json: @followers
  end

  def follow
    Follower.follow(current_user, params[:id])
    head :ok
  end

  def unfollow
    Follower.unfollow(current_user, params[:id])
    head :ok
  end

  def create
    follower_id = params[:follower][:follower_id]
    @follower = Follower.find_or_create_by(user_id: current_user, follower_id: follower_id)
    render json: @follower
  end

  def destroy
    @follower = Follower.where(user_id: current_user).first
    render json: @follower
  end

  def safe_params
    params.require(:follower).accept(:follower_id)
  end

  def current_user
    1
  end
end
