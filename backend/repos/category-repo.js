import DataBaseRepo from '../database/index.js'
import { 
    _findCategoryById,
    _deleteCategory,
    _getAllCategory,
    _updateCategory,
    _addCategory,
    _addImage,
    _confirmDeleteCategory,
    _restoreCategory,
    _trashCategory, 
    _deleteFileAttachment
} from '../database/queries/category-queries.js'

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
    return (result == null) ? result : null
  }

  static async findCategoryById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findCategoryById, [id])
    return (rows !== null) ? rows : null
  }

  static async deleteCategory(id) {
    const result = await DataBaseRepo.queryDatabase(_deleteCategory, [id])
    return (result !== null) ? result : null
  }

  static async confirmDeleteCategory(id) {
    const result = await this.findCategoryById(id)
    if (!result) {
      return null
    }
    await DataBaseRepo.queryDatabase(_deleteFileAttachment, [result[0].id_file])
    await DataBaseRepo.queryDatabase(_confirmDeleteCategory, [id])
    return { message: 'Category deleted successfully' }
  }

  static async restoreCategory(id) {
    const result = await DataBaseRepo.queryDatabase(_restoreCategory, [id])
    return (result !== null) ? result : null
  }

  static async trashCategory() {
    const rows = await DataBaseRepo.queryDatabase(_trashCategory, [])
    return (rows !== null) ? rows : null
  }

  static async getAllCategory() {
    const rows = await DataBaseRepo.queryDatabase(_getAllCategory)
    return (rows !== null) ? rows : null
  }

  static async updateCategory(id, name) {
    const rows = await DataBaseRepo.queryDatabase(_updateCategory, [name, id])
    return (rows !== null) ? rows : null
  }

  static async getUrl(result) {
    const url = await Promise.all(result.map(async (elem) => {
      const url = await getSignedUrl(s3client, new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: elem.file_path,
      }), {
          expiresIn: 3600
      })
      return {
          ...elem,
          file_path: url,
      };
    }));
    return url
  }

}