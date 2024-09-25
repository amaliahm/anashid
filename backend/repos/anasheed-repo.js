import DataBaseRepo from "../database/index.js";
import { 
    _findAnasheedById,
    _deleteAnasheed,
    _confirmDeleteAnasheed,
    _restoreAnasheed,
    _getAllAnasheed,
    _addAnasheed,
    _addFileAttachment,
    _deleteFileAttachment
} from "../database/queries/anasheed-queries.js";

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class AnasheedRepo {

    static async addAnasheed(
        title, description, duration, id_artist, id_language, id_theme, id_gender, id_category, id_image, id_audio
    ) {
        const result = await DataBaseRepo.getInsertedId(
            _addAnasheed, 
            [
                title, description, duration, id_artist, id_language, id_theme, id_gender, id_category,  id_image, id_audio
            ]
        )
        return (result === null || result.length > 0) 
        ? {
          id: result.id
        } 
        : null
    }

    static async addFileAttachment(
        packet_name, file_name, file_type, file_path, file_size, file_format
      ) {
        const file = await DataBaseRepo.getInsertedId(
          _addFileAttachment, 
          [
            packet_name, file_name, file_type, file_path, file_size, file_format
          ]
        )
        return file
    }

    static async findAnasheedById(id) {
      const rows = await DataBaseRepo.queryDatabase(_findAnasheedById, [id])
      return (rows === null || rows.length > 0) ? rows : null
    }

    static async deleteAnasheed(id) {
      await DataBaseRepo.queryDatabase(_deleteAnasheed, [id])
    }

    static async confirmDeleteAnasheed(id) {
      const result = await this.findAnasheedById(id)
      if (!result) {
        return { error: 'Anasheed not found' }
      }
      await DataBaseRepo.queryDatabase(_deleteFileAttachment, [result[0].id_image])
      await DataBaseRepo.queryDatabase(_deleteFileAttachment, [result[0].id_audio])
      await DataBaseRepo.queryDatabase(_confirmDeleteAnasheed, [id])
      return { message: 'Anasheed deleted successfully' }
    }

    static async restoreAnasheed(id) {
      await DataBaseRepo.queryDatabase(_restoreAnasheed, [id])
    }

    static async getAllAnasheed() {
      const rows = await DataBaseRepo.queryDatabase(_getAllAnasheed)
      return rows
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