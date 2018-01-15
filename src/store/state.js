import { loadFavoriteHistory } from 'common/js/cache'

const state = {
  user: '',
  favoriteHistory: loadFavoriteHistory()
}

export default state