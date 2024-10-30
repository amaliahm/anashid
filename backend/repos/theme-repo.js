import DataBaseRepo from '../database/index.js'
import { 
    _insertTheme,
    _getTheme,
    _deleteTheme,
    _findThemeById
} from '../database/queries/theme-queries.js'

export default class ThemeRepo {

  static async addTheme(value) {
    const result = await DataBaseRepo.getInsertedId(_insertTheme, [value])
    return (result !== null) 
    ? {
      id: result.id
    } 
    : null
  }

  static async findThemeById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findThemeById, [id])
    return (rows !== null) ? rows : null
  }

  static async deleteTheme(id) {
    const result = await DataBaseRepo.queryDatabase(_deleteTheme, [id])
    if (result === null) return null
    return { message: 'Theme deleted successfully' }
  }

  static async getAllTheme() {
    const rows = await DataBaseRepo.queryDatabase(_getTheme)
    return (rows !== null) ? rows : null
  }
}