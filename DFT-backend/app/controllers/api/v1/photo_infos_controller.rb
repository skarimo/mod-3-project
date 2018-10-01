class Api::V1::PhotoInfosController < ApplicationController
  before_action :find_photo_info, only: [:update]
  def index
    @photo_infos = PhotoInfo.all
    render json: @photo_infos
  end

  def create
    byebug
    @photo_info = PhotoInfo.create(photo_info_params)
    render json: @photo_info, status: :accepted
  end

  private

  def photo_info_params
    params.require(:photo_info).permit(:user_id, {:age => {}, :gender => {}, :emotion => {}, :beauty => {}, :ethnicity => {}, :skinstatus => {}, :smile =>{}})
  end

end


# :age, :user_id, :beauty, :emotion, :ethnicity, :gender, :skinstatus, :smile
