export const random = {
  limit(max) {
    return Math.floor(Math.random() * Math.floor(max))
  },
  range(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
  },
  uid() {
    return Math.floor(Math.random() * Math.floor(999999999999))
  },
}
