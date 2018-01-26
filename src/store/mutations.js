import * as types from './mutation-types'

const mutations = {
  [types.SET_FAVORITE_HISTORY](state, favoriteHistory) {
    state.favoriteHistory = favoriteHistory
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_REPLIES_HISTORY](state, repliesHistory) {
    state.repliesHistory = repliesHistory
  }
}

export default mutations