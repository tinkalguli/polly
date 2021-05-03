require "test_helper"

class PollTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'sam@example.com',
                    password: 'welcome',
                    password_confirmation: 'welcome')
    Poll.delete_all

    @poll = Poll.new(title: 'This is a test poll', user: @user)
  end

  def test_instance_of_poll
    assert_instance_of Poll, @poll
  end

  def test_instance_of_poll
    assert_not_instance_of User, @poll
  end

  def test_value_of_title_assigned
    assert_equal "This is a test poll", @poll.title
  end

  def test_value_created_at
    assert_nil @poll.created_at
  
    @poll.save!
    assert_not_nil @poll.created_at
  end

  test "error raised" do
    assert_raises ActiveRecord::RecordNotFound do
      Poll.find(SecureRandom.uuid)
    end
  end
  
  def test_count_of_number_of_polls
    assert_difference ['Poll.count'], 2 do
      Poll.create!(title: 'Creating a Poll through test', user: @user)
      Poll.create!(title: 'Creating another Poll through test', user: @user)
    end
  end

  def test_poll_should_not_be_valid_without_title
    @poll.title = ''
    assert @poll.invalid?
  end
end
