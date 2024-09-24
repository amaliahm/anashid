import DataBaseRepo from '../database/index.js'
import { _addImage, _updateUser, _getUserById, _updateImage } from '../database/queries/profile-queries.js';

// s3
import { s3client, deleteImageFromS3 } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class ProfileRepo {

  static async addImage(
    packet_name, file_name, file_type, file_path, file_size, file_format, id
  ) {
    const image = await DataBaseRepo.getInsertedId(
      _addImage, 
      [
        packet_name, file_name, file_type, file_path, file_size, file_format
      ]
    )
    const result = await DataBaseRepo.getInsertedId(_updateImage, [image.id, id])
    return (result === null || result.length > 0) ? result : null
  }

  static async findUserById(id) {
    const rows = await DataBaseRepo.queryDatabase(_getUserById, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async getUrl(result) {
    const image = await getSignedUrl(s3client, new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: result[0].file_path,
    }), {
      expiresIn: 3600
    })
    return {
      ...result[0],
      file_path: image
    }
  }

  static async updateImage(
    packet_name, file_name, file_type, file_path, file_size, file_format, id, old_file_path
  ) {
    const image = await DataBaseRepo.getInsertedId(
      _updateImage, 
      [
        packet_name, file_name, file_type, file_path, file_size, file_format, id
      ]
    )
    const result = await deleteImageFromS3(old_file_path)
    return (result || result.message ? result.message : null)
  }
}