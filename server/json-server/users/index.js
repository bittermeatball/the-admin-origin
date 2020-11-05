const data = {
  users: [],
}
// Create 10 users
for (let i = 0; i < 200; i++) {
  data.users.push({
    id: i,
    name: `user-${i}`,
    email: `user-${i}@gmail.com`,
    password: `1234567890`,
  })
}

module.exports = data
