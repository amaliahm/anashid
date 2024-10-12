import DataBaseRepo from '../database/index.js'
import { _addToFavorite, _getFavorite, _removeFromFavorite } from '../database/queries/favorite-queries.js'

export default class FavoriteRepo {

  static async addToFavorite(id_user, id_anasheed) {
    const result = await DataBaseRepo.getInsertedId(_addToFavorite, [id_user, id_anasheed])
    return (result === null || result.length > 0) 
  }

  static async removeFromFavorite(id_user, id_anasheed) {
    await DataBaseRepo.queryDatabase(_removeFromFavorite, [id_user, id_anasheed])
  }

  static async getFavorite(id_user) {
    const rows = await DataBaseRepo.queryDatabase(_getFavorite, [id_user])
    return rows
  }
}