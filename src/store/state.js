import { loadFavoriteHistory } from 'common/js/cache'

const state = {
  favoriteHistory: loadFavoriteHistory()
}

export default state