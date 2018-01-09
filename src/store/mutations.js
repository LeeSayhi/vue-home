import * as types from './mutation-types'

const mutations = {
  [types.SET_FAVORITE] (state, favorite) {
    state.favorite = favorite
  }
}

export default mutations