class RespondsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def create
    @respond = Respond.new(respond_params)
    if @respond.save
      render status: :ok, json: {
        isVoted: true
      }
    else
      errors = @respond.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def respond_params
    params.require(:respond).permit(:poll_id, :option_id)
  end
end
