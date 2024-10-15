import DataBaseRepo from '../database/index.js'
import { _addToFavorite, _getFavorite, _removeFromFavorite } from '../database/queries/favorite-queries.js'

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class FavoriteRepo {

  static async addToFavorite(id_user, id_anasheed) {
    await DataBaseRepo.queryDatabase(_addToFavorite, [id_user, id_anasheed])
  }

  static async removeFromFavorite(id_user, id_anasheed) {
    await DataBaseRepo.queryDatabase(_removeFromFavorite, [id_user, id_anasheed])
  }

  static async getFavorite(id_user) {
    const rows = await DataBaseRepo.queryDatabase(_getFavorite, [id_user])
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

  static async getAudioUrl(result) {
    const url = await Promise.all(result.map(async (elem) => {
      const url = await getSignedUrl(s3client, new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: elem.audio_path,
      }), {
          expiresIn: 3600
      })
      return {
          ...elem,
          audio_path: url,
      };
    }));
    return url
  }
}