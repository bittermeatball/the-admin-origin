const users = require('./users')
const posts = require('./posts')
module.exports = () => {
  return {
    users,
    posts,
  }
}
