# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :todos

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
         
  include DeviseTokenAuth::Concerns::User

  # after_create :send_confirmation_email

  # private

  # def send_confirmation_email
  #   self.send_confirmation_instructions
  # end
end
