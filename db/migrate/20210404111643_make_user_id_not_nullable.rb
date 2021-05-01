class MakeUserIdNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :polls, :user_id, false
  end
end
