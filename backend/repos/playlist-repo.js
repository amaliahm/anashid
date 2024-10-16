import DataBaseRepo from '../database/index.js'
import { _addImage, _addPlaylist, _deleteFileAttachment, _deletePlaylist, _findPlaylistById, _getPlaylist, _addToPlaylist, _getAnasheedFromPlaylist } from '../database/queries/playlist-queries.js';

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class PlaylistRepo {

  static async addPlaylist(name, id_user) {
    const result = await DataBaseRepo.getInsertedId(_addPlaylist, [name, id_user])
    return (result === null || result.length > 0) 
    ? {
      id: result.id
    } 
    : null
  }

  static async addImage(
    name, packet_name, file_name, file_type, file_path, file_size, file_format, id_user
  ) {
    const image = await DataBaseRepo.getInsertedId(
      _addImage, 
      [
        packet_name, file_name, file_type, file_path, file_size, file_format
      ]
    )
    const result = await DataBaseRepo.getInsertedId(_addPlaylist, [name, image.id, id_user])
    return (result === null || result.length > 0) ? result : null
  }

  static async findPlaylistById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findPlaylistById, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async deletePlaylist(id) {
    const result = await this.findPlaylistById(id)
    if (!result) {
      return { error: 'Playlist not found' }
    }
    await DataBaseRepo.queryDatabase(_deleteFileAttachment, [result[0].id_file])
    await DataBaseRepo.queryDatabase(_deletePlaylist, [id])
    return { message: 'Playlist deleted successfully' }
  }

  static async getPlaylists(id_user) {
    const rows = await DataBaseRepo.queryDatabase(_getPlaylist, [id_user, id_user])
    return (rows === null || rows.length > 0) ? rows : null
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

  static async addToPlaylist(id_playlist, id_anasheed) {
    const data = await DataBaseRepo.queryDatabase(_getAnasheedFromPlaylist, [id_anasheed, id_playlist])
    if (!data) {
      const rows = await DataBaseRepo.queryDatabase(_addToPlaylist, [id_anasheed, id_playlist])
      return rows
    }
    return data
  }
}