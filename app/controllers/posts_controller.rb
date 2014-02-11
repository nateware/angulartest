class PostsController < ApplicationController
  respond_to :json

  def index
    @posts = Post.all
    render json: @posts
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      render json: @post
    else
      logger.warn "Post update fail: #{@post.errors.full_messages}"
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def post_params
    params.require(:post).permit(:title, :body, :user_id)
  end
end
