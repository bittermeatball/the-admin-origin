const users = require('./users')
const blogs = require('./blogs')
module.exports = () => {
  return {
    users,
    blogs,
  }
}
