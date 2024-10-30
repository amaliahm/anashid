import DataBaseRepo from '../database/index.js'
import { 
    _insertGender,
    _getGender,
    _deleteGender,
    _findGenderById
} from '../database/queries/gender-queries.js'

export default class GenderRepo {

  static async addGender(value) {
    const result = await DataBaseRepo.getInsertedId(_insertGender, [value])
    return (result !== null) 
    ? {
      id: result.id
    } 
    : null
  }

  static async findGenderById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findGenderById, [id])
    return (rows !== null) ? rows : null
  }

  static async deleteGender(id) {
    const result = await DataBaseRepo.queryDatabase(_deleteGender, [id])
    if (result === null) return null
    return { message: 'Gender deleted successfully' }
  }

  static async getAllGender() {
    const rows = await DataBaseRepo.queryDatabase(_getGender)
    return (rows !== null) ? rows : null
  }
}