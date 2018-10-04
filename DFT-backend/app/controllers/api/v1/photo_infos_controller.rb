class Api::V1::PhotoInfosController < ApplicationController
  def index
    @photo_infos = PhotoInfo.all
    render json: @photo_infos
  end

  def create
    @photo_info = PhotoInfo.create(photo_info_params)
    render json: @photo_info, status: :accepted
  end

  def show
    @photo = PhotoInfo.find(params[:id])
    render json: @photo
  end
  def update
    @photo = PhotoInfo.find(params[:id])
    @photo.update(note:params[:photo_info][:note])
    render json: @photo
  end

  private

  def photo_info_params
    params.require(:photo_info).permit(:user_id, {:age => {}, :gender => {}, :emotion => {}, :beauty => {}, :ethnicity => {}, :skinstatus => {}, :smile =>{}})
  end

end


# :age, :user_id, :beauty, :emotion, :ethnicity, :gender, :skinstatus, :smile
