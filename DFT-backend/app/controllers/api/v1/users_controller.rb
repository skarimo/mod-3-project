class Api::V1::UsersController < ApplicationController

  def find_or_create
    @user = User.find_or_create_by(user_strong_params)
    render json: @user
  end

  def find_all_photos
    @user = User.find(user_id_params[:user_id])
    @photos = @user.photo_infos
    render json: @photos
  end

  private

  def user_strong_params
    params.require(:user).permit(:user_id, :name, :email)
  end

  def user_id_params
    params.permit(:user_id)
  end

end
