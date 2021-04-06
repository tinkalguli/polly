class AddForeignKeyToRespond < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :responds, :users, column: :user_id, on_delete: :cascade
    add_foreign_key :responds, :polls, column: :poll_id, on_delete: :cascade
    add_foreign_key :responds, :options, column: :option_id, on_delete: :cascade
  end
end
