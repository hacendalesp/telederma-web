class AddEmailFromClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :email, :string
  end
end
