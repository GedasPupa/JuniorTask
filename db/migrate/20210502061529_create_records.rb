class CreateRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :records do |t|
      t.string :Mfr_Name, null: false
      t.string :Mfr_ID, null: false
      t.timestamps
    end
  end
end
