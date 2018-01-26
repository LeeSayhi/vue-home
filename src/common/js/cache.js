import storage from 'good-storage'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_LEN = 20

const REPLY_KEY = '__reply__'
const REPLY_LEN = 20

const USER_KEY = '__user__'

const THUMB_UP_KEY = '__thumbUp__'

function insertArray(arr, val, maxLen) {
  const index = arr.findIndex((item) => {
    return item.id === val.id
  })
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, val) {
  const index = arr.findIndex((item) => {
    return item.id === val.id
  })
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveUser(accesstoken, res) {
  const user = {
    user_id: res.data.id,
    accesstoken,
    loginname: res.data.loginname
  }
  storage.set(USER_KEY, user)
}

export function loadUser() {
  return storage.get(USER_KEY, [])
}

export function saveFavorite(art) {
  const arts = storage.get(FAVORITE_KEY, [])
  insertArray(arts, art, FAVORITE_LEN)
  storage.set(FAVORITE_KEY, arts)
  return arts
}

export function deleteFavorite(art) {
 const arts = storage.get(FAVORITE_KEY, [])
 deleteFromArray(arts, art)
 storage.set(FAVORITE_KEY, arts)
 return arts
}

export function loadFavoriteHistory() {
  return storage.get(FAVORITE_KEY, [])
}

export function saveReplies(reply) {
  const replies = storage.get(REPLY_KEY, [])
  insertArray(replies, reply, REPLY_LEN)
  storage.set(REPLY_KEY, replies)
  return replies
}

export function deleteReplies(reply) {
  const replies = storage.get(REPLY_KEY, [])
  deleteFromArray(replies, reply)
  storage.set(REPLY_KEY, replies)
  return replies
}

export function loadReplyHistory(reply) {
  return storage.get(REPLY_KEY, [])
}