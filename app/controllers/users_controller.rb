class UsersController < ApplicationController
  respond_to :json

  def index
    @users = User.all
    respond_with @users
  end

  def show
    @users = User.find(params[:id])
    respond_with @users
  end
end
