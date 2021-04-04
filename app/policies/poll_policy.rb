class PollPolicy
  attr_reader :user, :poll

  def initialize(user, poll)
    @user = user
    @poll = poll
  end

  # The show policy check is invoked when we call `authorize @poll`
  # from the show action of polls controller.
  # Here the condition we want to check is that
  # whether the record's creator is current user or record is assigned to the current user.
  def show?
    true
  end

  # The condition for edit policy is the same as that of the show.
  # Hence, we can simply call `show?` inside the edit? policy here.
  def edit?
    poll.user_id == user.id
  end

  # Similar in the case for update? policy.
  def update?
    edit?
  end

  # Every user can create a poll, hence create? will always returns true.
  def create?
    true
  end

  # Only the user that has created the poll, can delete it.
  def destroy?
    edit?
  end

  # class Scope
  #   attr_reader :user, :scope

  #   def initialize(user, scope)
  #     @user = user
  #     @scope = scope
  #   end

  #   def resolve
  #     scope.where(creator_id: user.id).or(scope.where(user_id: user.id))
  #   end
  # end
end