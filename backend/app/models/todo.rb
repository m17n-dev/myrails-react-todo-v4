class Todo < ApplicationRecord
    validates :title, presence: true, length: { maximum: 140 }

    belongs_to :owner, class_name: 'User', foreign_key: :user_id
end
