const data = {
  posts: [],
}
// Create 10 users
for (let i = 0; i < 1000; i++) {
  const ran = Math.floor(Math.random() * 201)
  data.posts.push({
    id: i,
    title: `Lorem Ipsum is simply dummy text of the printing an ${i}`,
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ${i}`,
    user: {
      id: ran,
      name: `user-${ran}`,
      email: `user-${ran}@gmail.com`,
    },
    createdAt: new Date().getDate(),
    updatedAt: null,
    deletedAt: null,
  })
}

module.exports = data
