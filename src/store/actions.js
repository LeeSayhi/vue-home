import { saveFavorite, deleteFavorite, saveReplies, deleteReplies } from 'common/js/cache'
import * as types from './mutation-types'

export const saveFavoriteHistory = function({commit}, item) {
  commit(types.SET_FAVORITE_HISTORY, saveFavorite(item))
}

export const deleteFavoriteHistory = function({commit}, item) {
  commit(types.SET_FAVORITE_HISTORY, deleteFavorite(item))
}

export const saveRepliesHistory = function({commit}, item) {
  commit(types.SET_REPLIES_HISTORY, saveReplies(item))
}

export const deleteRepliesHistory = function({commit}, item) {
  commit(types.SET_REPLIES_HISTORY, deleteRepliesHistory(item))
}