import { loadFavoriteHistory, loadReplyHistory } from 'common/js/cache'

const state = {
  user: '',
  favoriteHistory: loadFavoriteHistory(),
  repliesHistory: loadReplyHistory()
}

export default state