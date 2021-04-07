class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      render status: :ok, json: {
        auth_token: @user.authentication_token,
        user_id: @user.id,
        user_first_name: @user.first_name,
      }
    else
      errors = @user.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def user_params
    params.require(:user)
      .permit(
        :first_name, :last_name, :email, :password, :password_confirmation
      )
  end
end
