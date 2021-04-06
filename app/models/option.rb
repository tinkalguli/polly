class Option < ApplicationRecord
  belongs_to :poll
  has_many :responds, dependent: :destroy
  validates :content, presence: true, length: { maximum: 120 }
end
