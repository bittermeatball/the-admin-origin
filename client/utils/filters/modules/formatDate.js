export default (val) => {
  const moment = require('moment')
  return moment(val).format('l')
}
