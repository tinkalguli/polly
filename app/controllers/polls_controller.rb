class PollsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :index
  before_action :load_poll, only: %i[show update destroy]

  def index
    polls = Poll.all.order('created_at DESC')
    render status: :ok, json: { polls: polls }
  end

  # def create
  #   @poll = Poll.new(poll_params.merge(user_id: @current_user.id))
    
  #   if @poll.save
  #     begin
  #       Option.transaction do
  #         @options = Option.create!(options_params.map { |x| x.merge(poll_id: @poll.id) })
  #       end
  #     rescue ActiveRecord::RecordInvalid => exception
  #       @optionsError = exception
  #     end

  #     if !@optionsError
  #       render status: :ok, json: { notice: t('successfully_created', entity: 'Poll') }
  #     else
  #       Poll.destroy(@poll.id)
  #       render status: :unprocessable_entity, json: { errors: @optionsError }
  #     end

  #   else
  #     errors = @poll.errors.full_messages
  #     render status: :unprocessable_entity, json: { errors: errors }
  #   end
  # end

  def create
    @poll = Poll.new(poll_params.merge(user_id: @current_user.id))
    
    if @poll.save
      # begin
      #   Option.transaction do
      #     @options = Option.create!(options_params.map { |x| x.merge(poll_id: @poll.id) })
      #   end
      # rescue ActiveRecord::RecordInvalid => exception
      #   @optionsError = exception
      # end

      # if !@optionsError
        render status: :ok, json: { notice: t('successfully_created', entity: 'Poll') }
      # else
      #   Poll.destroy(@poll.id)
      #   render status: :unprocessable_entity, json: { errors: @optionsError }
      # end

    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    render status: :ok, json: { poll: @poll }
  end

  def update
    authorize @poll
    if @poll.update(poll_params)
      render status: :ok, json: { notice: 'Successfully updated poll.' }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def destroy
    authorize @poll
    if @poll.destroy
      render status: :ok, json: { notice: 'Successfully deleted poll.' }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def poll_params
    params.require(:poll).permit(:title, :options_attributes => [:content])
  end

  def options_params
    params.permit(options: [:content]).require(:options)
  end

  def load_poll
    @poll = Poll.find(params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end
end
