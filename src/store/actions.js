import * as types from './mutation-types'
import { saveFavorite, deleteFavorite } from 'common/js/cache'

export const saveFavoriteHistory = function({commit}, item) {
  commit(types.SET_FAVORITE_HISTORY, saveFavorite(item))
}

export const deleteFavoriteHistory = function({commit}, item) {
  commit(types.SET_FAVORITE_HISTORY, deleteFavorite(item))
}