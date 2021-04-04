class Option < ApplicationRecord
  belongs_to :poll
  validates :content, presence: true, length: { maximum: 120 }
end
