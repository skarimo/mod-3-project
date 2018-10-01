class CreatePhotoInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :photo_infos do |t|
      t.json :age
      t.json :beauty
      t.json :emotion
      t.json :ethnicity
      t.json :gender
      t.json :skinstatus
      t.json :smile
      t.integer :user_id

      t.timestamps
    end
  end
end
