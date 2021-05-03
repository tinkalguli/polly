require "test_helper"

class ResponseTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'sam@example.com',
                    password: 'welcome',
                    password_confirmation: 'welcome')
    @poll = Poll.new(title: 'This is a test poll', user: @user)
    @option = Option.new(content: 'This is a test poll', poll: @poll)

    Response.delete_all

    @response = Response.new(user: @user, poll: @poll, option: @option)
  end

  def test_valid_response_should_be_saved
    assert_difference 'Response.count' do
      @response.save
    end
  end

  def test_response_should_not_be_valid_without_poll
    @response.poll = nil
    assert @response.invalid?
  end

  def test_response_should_not_be_valid_without_user
    @response.user = nil
    assert @response.invalid?
  end

  def test_response_should_not_be_valid_without_option
    @response.option = nil
    assert @response.invalid?
  end
end
