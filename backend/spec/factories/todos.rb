FactoryBot.define do
    factory :todo do
        sequence(:title) { |n| "Todo #{n}" }
        association :owner
    end
end