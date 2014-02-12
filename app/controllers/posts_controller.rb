class PostsController < ApplicationController
  respond_to :json

  def index
    @posts = Post.all
    respond_with @posts
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      respond_with @post
    else
      logger.warn "Post update fail: #{@post.errors.full_messages}"
      respond_with @post, status: :unprocessable_entity
    end
  end

  def post_params
    params.require(:post).permit(:title, :body, :user_id)
  end
end
