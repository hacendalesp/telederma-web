class AddRoleFromClientUser < ActiveRecord::Migration[5.1]
  def change
    add_column :client_users, :role, :integer
  end
end
