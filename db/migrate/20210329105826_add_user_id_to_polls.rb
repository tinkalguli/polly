class AddUserIdToPolls < ActiveRecord::Migration[6.1]
  def change
    add_column :polls, :user_id, :integer
  end
end
