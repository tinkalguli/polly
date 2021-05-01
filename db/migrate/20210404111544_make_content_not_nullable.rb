class MakeContentNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :options, :content, false
  end
end
