import storage from 'good-storage'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_LEN = 20

function insertArray(arr, val, maxLen) {
  let index = arr.findIndex((item) => {
    return item.id === val.id
  })
  console.log(arr, val)
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
  let index = arr.findIndex((item) => {
    return item.id === val.id
  })
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveFavorite(art) {
  let arts = storage.get(FAVORITE_KEY, [])
  insertArray(arts, art, FAVORITE_LEN)
  storage.set(FAVORITE_KEY, arts)
  return arts
}

export function deleteFavorite(art) { 
 let arts = storage.get(FAVORITE_KEY, [])
 deleteFromArray(arts, art)
 storage.set(FAVORITE_KEY, arts)
 return arts
}

export function loadFavoriteHistory() {
  return storage.get(FAVORITE_KEY, [])
}