import DataBaseRepo from '../database/index.js'
import { 
    _findCategoryById,
    _deleteCategory,
    _getAllCategory,
    _updateCategory,
    _addCategory,
    _addImage
} from '../database/queries/category-queries.js'

export default class CategoryRepo {

  static async addCategory(name) {
    const result = await DataBaseRepo.getInsertedId(_addCategory, [name])
    return (result === null || result.length > 0) 
    ? {
      id: result.id
    } 
    : null
  }

  static async addImage(
    name, packet_name, file_name, file_type, file_path, file_size, file_format
  ) {
    const image = await DataBaseRepo.getInsertedId(
      _addImage, 
      [
        packet_name, file_name, file_type, file_path, file_size, file_format
      ]
    )
    const result = await DataBaseRepo.getInsertedId(_addCategory, [name, image.id])
    return (result === null || result.length > 0) ? result : null
  }

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