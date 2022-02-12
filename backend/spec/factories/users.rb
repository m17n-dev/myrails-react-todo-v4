FactoryBot.define do
    factory :user, aliases: [:owner] do
        provider     { 'email' }
        uid          { Faker::Internet.safe_email }
        password     { Faker::Internet.password }
        email        { uid }
        name         { Gimei.name }
        confirmed_at { Date.parse('2021/12/31') }
    end
end
