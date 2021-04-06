class RespondsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[create]
  before_action :check_respond_existance, only: %i[create]

  def create
    @respond = Respond.new(respond_params)
    if @respond.save
      render status: :ok, json: { notice: "Vote is submitted" }
    else
      errors = @respond.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def respond_params
    params.require(:respond).permit(:poll_id, :option_id)
  end

  def check_respond_existance
    respond = Respond.where(
      poll_id: respond_params[:poll_id],
      user_id: @current_user.id
    )
    if respond.length
      render status: :unprocessable_entity, json: {
        errors: "You have already voted"
      }
    end
  end
end
