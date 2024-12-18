import DataBaseRepo from "../database/index.js";
import { 
    _findAnasheedById,
    _deleteAnasheed,
    _confirmDeleteAnasheed,
    _restoreAnasheed,
    _getAllAnasheed,
    _addAnasheed,
    _addFileAttachment,
    _deleteFileAttachment,
    _trashAnasheed,
    _updateAnasheed,
    _getCategoryAnasheed,
    _getArtistAnasheed,
    _getFavorite,
    _getPlaylistAnasheed,
    _newAnasheed,
    _trendingAnasheed
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
        return (result !== null) 
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
      return (rows !== null) ? rows : null
    }

    static async deleteAnasheed(id) {
      const result = await DataBaseRepo.queryDatabase(_deleteAnasheed, [id])
      return (result !== null) ? result : null
    }

    static async confirmDeleteAnasheed(id) {
      const result = await this.findAnasheedById(id)
      if (result === null) return null
      await DataBaseRepo.queryDatabase(_deleteFileAttachment, [result[0].id_image])
      await DataBaseRepo.queryDatabase(_deleteFileAttachment, [result[0].id_audio])
      await DataBaseRepo.queryDatabase(_confirmDeleteAnasheed, [id])
      return { message: 'Anasheed deleted successfully' }
    }

    static async restoreAnasheed(id) {
      const result = await DataBaseRepo.queryDatabase(_restoreAnasheed, [id])
      return (result !== null) ? result : null
    }

    static async trashAnasheed() {
      const rows = await DataBaseRepo.queryDatabase(_trashAnasheed, [])
      return (rows !== null) ? rows : null
    }

    static async getAllAnasheed() {
      const rows = await DataBaseRepo.queryDatabase(_getAllAnasheed)
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        listening_anasheed: Number(elem.listening_anasheed),
        favorite_anasheed: Number(elem.favorite_anasheed)
      }))
      return sanitized_rows
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

  static async updateAnasheed(id, title, description) {
    const result = await DataBaseRepo.queryDatabase(_updateAnasheed, [title, description, id])
    return (result !== null) ? result : null
  }

  static async getCategoryAnasheed(id) {
    const rows = await DataBaseRepo.queryDatabase(_getCategoryAnasheed, [id])
    return (rows !== null) ? rows : null
  }

  static async getArtistAnasheed(id) {
    const rows = await DataBaseRepo.queryDatabase(_getArtistAnasheed, [id])
    return (rows !== null) ? rows : null
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

  static async getPlaylistAnasheed(id, id_playlist) {
    const rows = await DataBaseRepo.queryDatabase(_getPlaylistAnasheed, [id, id_playlist])
    return (rows !== null) ? rows : null
  }

  static async getNewAnasheed() {
    const rows = await DataBaseRepo.queryDatabase(_newAnasheed, [])
    return (rows !== null) ? rows : null
  }

  static async getTrendingAnasheed() {
    const rows = await DataBaseRepo.queryDatabase(_trendingAnasheed, [])
    if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        listening_duration: Number(elem.listening_duration)
      }))
      return sanitized_rows
  }
}