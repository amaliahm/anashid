import DataBaseRepo from '../database/index.js'
import { 
    _insertLanguage,
    _getLanguage,
    _deleteLanguage,
    _findLanguageById
} from '../database/queries/language-queries.js'

export default class LanguageRepo {

  static async addLanguage(value) {
    const result = await DataBaseRepo.getInsertedId(_insertLanguage, [value])
    return (result !== null) 
    ? {
      id: result.id
    } 
    : null
  }

  static async findLanguageById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findLanguageById, [id])
    return (rows !== null) ? rows : null
  }

  static async deleteLanguage(id) {
    const result = await DataBaseRepo.queryDatabase(_deleteLanguage, [id])
    if (result === null) return null
    return { message: 'Language deleted successfully' }
  }

  static async getAllLanguage() {
    const rows = await DataBaseRepo.queryDatabase(_getLanguage)
    return (rows !== null) ? rows : null
  }
}