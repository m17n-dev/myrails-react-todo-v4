require 'rails_helper'

RSpec.describe User, type: :model do
    it "has a valid factory" do
        expect(FactoryBot.build(:user)).to be_valid
    end

    it "is valid with a name, email, and password" do
        user = User.new(
            name:     "Taro",
            email:    "tester@example.com",
            password: "test-password-123",
        )
        expect(user).to be_valid
    end

    it "is invalid without an email address" do
        user = User.new(email: nil)
        user.valid?
        expect(user.errors[:email]).to include("can't be blank")
    end
    
    it "is invalid with a duplicate email address" do
        User.create(
            name:     "Taro",
            email:    "tester@example.com",
            password: "test-password-123",
        )
        user = User.new(
            name:     "Ziro",
            email:    "tester@example.com",
            password: "test-password-123",
        )
        user.valid?
        expect(user.errors[:email]).to include("has already been taken")
    end
end
