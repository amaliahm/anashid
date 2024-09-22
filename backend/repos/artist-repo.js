import DataBaseRepo from '../database/index.js'
import { 
    _findArtistById, 
    _deleteArtist, 
    _getAllArtist, 
    _updateArtist ,
    _addArtist,
    _addImage,
    _confirmDeleteArtist,
    _restoreArtist,
    _trashArtist
} from '../database/queries/artist-queries.js'

export default class ArtistRepo {

  static async addArtist(name, bio) {
    const result = await DataBaseRepo.getInsertedId(_addArtist, [name, bio])
    return (result === null || result.length > 0) 
    ? {
      id: result.id
    } 
    : null
  }

  static async addImage(
    name, bio, packet_name, file_name, file_type, file_path, file_size, file_format
  ) {
    const image = await DataBaseRepo.getInsertedId(
      _addImage, 
      [
        packet_name, file_name, file_type, file_path, file_size, file_format
      ]
    )
    const result = await DataBaseRepo.getInsertedId(_addArtist, [name, bio, image.id])
    return (result === null || result.length > 0) ? result : null
  }

  static async findArtistById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findArtistById, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async deleteArtist(id) {
    await DataBaseRepo.queryDatabase(_deleteArtist, [id])
  }

  static async confirmDeleteArtist(id) {
    await DataBaseRepo.queryDatabase(_confirmDeleteArtist, [id])
  }

  static async restoreArtist(id) {
    await DataBaseRepo.queryDatabase(_restoreArtist, [id])
  }

  static async trashArtist() {
    const rows = await DataBaseRepo.queryDatabase(_trashArtist, [])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async getAllArtist() {
    const rows = await DataBaseRepo.queryDatabase(_getAllArtist)
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async updateArtist(name, bio, id) {
    await DataBaseRepo.queryDatabase(_updateArtist, [name, bio, id])
  }

}