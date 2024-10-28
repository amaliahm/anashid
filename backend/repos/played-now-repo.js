import DataBaseRepo from '../database/index.js'
import { _addListening, _getListeningNasheed, _getFavorite, _getAllListeningNasheed } from '../database/queries/played-now-queries.js';

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class PlayedNowRepo {

  static async addListening(id_user, id_anasheed, position) {
    const result = await DataBaseRepo.getInsertedId(_addListening, [id_user, id_anasheed, position])
    return result
  }

  static async getLastListening(id_user) {
    const rows = await DataBaseRepo.queryDatabase(_getListeningNasheed, [id_user])
    return rows
  }

  static async getListening(id_user) {
    const rows = await DataBaseRepo.queryDatabase(_getAllListeningNasheed, [id_user])
    return rows
  }

  static async getUrl(result, file_path) {
      const url = await Promise.all(result.map(async (elem) => {
        const url = await getSignedUrl(s3client, new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: elem[file_path],
        }), {
            expiresIn: 3600
        })
        return {
            ...elem,
            [file_path]: url,
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

  static async getWithFavorite(id_user, data) {
    const favorites = await DataBaseRepo.queryDatabase(_getFavorite, [id_user])
    if (!favorites) {
      const anasheed_with_favorite = data.map(nasheed => ({
        ...nasheed,
        is_favorite: false
      }))
      return anasheed_with_favorite
    }
    const favoriteIds = new Set(Object.keys(favorites).map(fav => favorites[fav].id_anasheed));
    const anasheed_with_favorite = data.map(nasheed => ({
      ...nasheed,
      is_favorite: favoriteIds.has(nasheed.id)
    }))
    return anasheed_with_favorite
  }
}