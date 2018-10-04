class AddNoteToPhotoInfos < ActiveRecord::Migration[5.2]
  def change
    add_column :photo_infos, :note, :json
  end
end
