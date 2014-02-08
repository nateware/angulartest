class PostsController < ApplicationController
  respond_to :json

  def index
    @posts = Post.all
    sleep 1
    render json: @posts
  end
end
