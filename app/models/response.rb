class Response < ApplicationRecord
  belongs_to :user
  belongs_to :poll
  belongs_to :option
end
