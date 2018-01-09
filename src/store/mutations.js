import * as types from './mutation-types'

const mutations = {
  [types.SET_FAVORITE_HISTORY](state, favoriteHistory) {
    state.favoriteHistory = favoriteHistory
  }
}

export default mutations