function getRandomString() {
  return Math.random().toString(36).substring(7)
}

class Utils {
  static getRandomString = getRandomString
}

export { Utils }
