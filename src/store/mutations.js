import * as types from './mutation-types'

const mutations = {
  [types.SET_FAVORITE_HISTORY](state, favoriteHistory) {
    state.favoriteHistory = favoriteHistory
  },
  [types.SET_USER](state, user) {
    state.user = user
  }
}

export default mutations