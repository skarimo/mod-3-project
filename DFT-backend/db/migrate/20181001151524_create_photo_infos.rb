class CreatePhotoInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :photo_infos do |t|

      t.timestamps
    end
  end
end
