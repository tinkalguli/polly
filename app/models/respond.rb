class Respond < ApplicationRecord
  belongs_to :user
  belongs_to :poll
  belongs_to :option
end

def change
  create_table :responds do |t|
    t.integer :user_id, null: false
    t.integer :poll_id, null: false
    t.integer :option_id, null: false
    
    t.timestamps
  end
end

class AddForeignKeyToRespond < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :responds, :users, column: :user_id, on_delete: :cascade
    add_foreign_key :responds, :polls, column: :poll_id, on_delete: :cascade
    add_foreign_key :responds, :options, column: :option_id, on_delete: :cascade
  end
end