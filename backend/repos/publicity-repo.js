import DataBaseRepo from '../database/index.js'
import { 
    _insertPublicity,
    _addImage,
    _deleteFileAttachment,
    _getPublicity,
    _deletePublicity,
    _findPublicityById
} from '../database/queries/publicity-queries.js'

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class PublicityRepo {

  static async addPublicity(id_file) {
    const result = await DataBaseRepo.getInsertedId(_insertPublicity, [id_file])
    return (result !== null) 
    ? {
      id: result.id
    } 
    : null
  }

  static async addImage(
    packet_name, file_name, file_type, file_path, file_size, file_format
  ) {
    const image = await DataBaseRepo.getInsertedId(
      _addImage, 
      [
        packet_name, file_name, file_type, file_path, file_size, file_format
      ]
    )
    if (image === null) return null
    const result = await DataBaseRepo.getInsertedId(_insertPublicity, [image.id])
    return (result !== null) ? result : null
  }

  static async findPublicityById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findPublicityById, [id])
    return (rows !== null) ? rows : null
  }

  static async deletePublicity(id) {
    const result = await this.findPublicityById(id)
    if (!result) {
      return null
    }
    const delete_file = await DataBaseRepo.queryDatabase(_deleteFileAttachment, [result[0].id_file])
    if (delete_file === null) return null
    const delete_pub = await DataBaseRepo.queryDatabase(_deletePublicity, [id])
    if (delete_pub === null) return null
    return { message: 'Publicity deleted successfully' }
  }

  static async getAllPublicity() {
    const rows = await DataBaseRepo.queryDatabase(_getPublicity)
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