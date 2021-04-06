class CreateResponds < ActiveRecord::Migration[6.1]
  def change
    create_table :responds do |t|
      t.integer :user_id, null: false
      t.integer :poll_id, null: false
      t.integer :option_id, null: false
      
      t.timestamps
    end
  end
end
