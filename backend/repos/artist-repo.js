import DataBaseRepo from './database-repo.js'
import { 
    _findArtistById, 
    _deleteArtist, 
    _getAllArtist, 
    _updateArtist 
} from '../database/queries/artist-queries'

export default class ArtistRepo {

  static async findArtistById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findArtistById, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async deleteArtist(id) {
    await DataBaseRepo.queryDatabase(_deleteArtist, [id])
  }

  static async getAllArtist() {
    const rows = await DataBaseRepo.queryDatabase(_getAllArtist)
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async updateArtist(name, bio, id) {
    await DataBaseRepo.queryDatabase(_updateArtist, [name, bio, id])
  }

}