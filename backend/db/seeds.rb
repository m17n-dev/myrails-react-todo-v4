puts 'Creating users...'

50.times do |i|
  user=User.new(
    # name: Faker::Internet.user_name,
    # email: Faker::Internet.email,
    # password: Faker::Internet.password
    name: "Name#{i + 1}",
    email: "example#{i + 1}@example.com",
    password: 'password'
  )
  user.save!
  # puts 'Saved successfully'
  rescue ActiveRecord::RecordInvalid => e
    puts e
    puts 'Failed to save'
end

users = User.order(:created_at).take(3)

puts 'Creating todos...'

10.times do |i|
  # Todo.create(title: "Todo#{i + 1}")
  users.each do |user|
    user.todos.create!(title: "Todo#{i + 1} of #{user.name}")
    # puts 'Created successfully'
    rescue ActiveRecord::RecordInvalid => e
      puts e
      puts 'Failed to create'
  end
end

puts '...Finished!'
