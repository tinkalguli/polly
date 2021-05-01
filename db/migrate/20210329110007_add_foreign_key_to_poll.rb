class AddForeignKeyToPoll < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :polls, :users, column: :user_id, on_delete: :cascade
  end
end
