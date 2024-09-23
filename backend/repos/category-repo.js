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
    _trashCategory
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
    return (result === null || result.length > 0) ? result : null
  }

  static async findCategoryById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findCategoryById, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async deleteCategory(id) {
    await DataBaseRepo.queryDatabase(_deleteCategory, [id])
  }

  static async confirmDeleteCategory(id) {
    await DataBaseRepo.queryDatabase(_confirmDeleteCategory, [id])
  }

  static async restoreCategory(id) {
    await DataBaseRepo.queryDatabase(_restoreCategory, [id])
  }

  static async trashCategory() {
    const rows = await DataBaseRepo.queryDatabase(_trashCategory, [])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async getAllCategory() {
    const rows = await DataBaseRepo.queryDatabase(_getAllCategory)
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async updateCategory(name, id) {
    await DataBaseRepo.queryDatabase(_updateCategory, [name, bio, id])
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