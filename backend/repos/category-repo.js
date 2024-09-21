import DataBaseRepo from '../database/index.js'
import { 
    _findCategoryById,
    _deleteCategory,
    _getAllCategory,
    _updateCategory
} from '../database/queries/category-queries.js'

export default class CategoryRepo {

  static async findCategoryById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findCategoryById, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async deleteCategory(id) {
    await DataBaseRepo.queryDatabase(_deleteCategory, [id])
  }

  static async getAllCategory() {
    const rows = await DataBaseRepo.queryDatabase(_getAllCategory)
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async updateCategory(name, id) {
    await DataBaseRepo.queryDatabase(_updateCategory, [name, bio, id])
  }

}