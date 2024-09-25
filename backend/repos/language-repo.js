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
    return (result === null || result.length > 0) 
    ? {
      id: result.id
    } 
    : null
  }

  static async findLanguageById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findLanguageById, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async deleteLanguage(id) {
    await DataBaseRepo.queryDatabase(_deleteLanguage, [id])
    return { message: 'Language deleted successfully' }
  }

  static async getAllLanguage() {
    const rows = await DataBaseRepo.queryDatabase(_getLanguage)
    return (rows === null || rows.length > 0) ? rows : null
  }
}