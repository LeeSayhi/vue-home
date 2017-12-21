/*
 * 格式化时间
 * @param {String} str
 * @return 格式化后的时间
 */

export function formatNewDate(str) {
  const date = new Date(str)
  const nowDate = new Date()

  const time = nowDate.getTime() - date.getTime()

  switch (true) {
    case time < 0:
      return ' '
      // break
    case time / 1000 < 30:
      return '刚刚'
      // break
    case time / 1000 < 60:
      return `${parseInt(time / 1000, 10)}秒前`
      // break
    case time / 6000 < 60:
      return `${parseInt(time / 6000, 10)}分钟前`
      // break
    case time / 3600000 < 24:
      return `${parseInt(time / 3600000, 10)}小时前`
      // break
    case time / 86400000 < 31:
      return `${parseInt(time / 86400000, 10)}天前`
      // break
    case time / 2592000000 < 12:
      return `${parseInt(time / 2592000000, 10)}月前`
      // break
    default:
      return `${parseInt(time / 31536000000, 10)}年前`
      // break
  }
}