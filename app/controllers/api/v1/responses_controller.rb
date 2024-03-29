class Api::V1::ResponsesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[create]
  before_action :check_response_existance, only: %i[create]

  def create
    @response = Response.new(response_params)
    if @response.save
      render status: :ok, json: { notice: t('response.success_message') }
    else
      errors = @response.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def response_params
    params.require(:response)
      .permit(:poll_id, :option_id)
      .merge(user_id: @current_user.id)
  end

  def check_response_existance
    response = Response.where(
      poll_id: response_params[:poll_id],
      user_id: @current_user.id
    )
    if response.length > 0
      render status: :unprocessable_entity, json: {
        errors: t('response.duplicate_error_message')
      }
    end
  end
end
