const data = {
  data: [],
  total: 20,
}
// Create 10 users
for (let i = 0; i < data.total; i++) {
  data.data.push({
    id: i,
    name: `user-${i}`,
    email: `user-${i}@gmail.com`,
    password: `1234567890`,
  })
}

module.exports = data
