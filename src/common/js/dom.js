// 封装 class 方法
function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let newClass = ' ' + el.className + ' '
  newClass = newClass.replace(/(\s+)/gi, ' ')
  let removed = newClass.replace(' ' + className + ' ', ' ')
  removed = removed.replace(/(^\s+)|(\s+$)/g, '')

  el.className = removed
}