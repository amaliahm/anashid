// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

// repos
import ArtistRepo from "../repos/artist-repo.js";


export default class ArtistController {

    static async getAllArtists (req, res) {
        const artists = await ArtistRepo.getAllArtist();
        if (!artists) {
            return res.status(404).json({ error: 'Failed to fetch artists' });
        }
        const artists_with_urls = await ArtistRepo.getUrl(artists);
        res.status(200).json(artists_with_urls);
    }

    static async addArtist(req, res) {
        const { name, bio } = req.body;
        const file = req.file

        const packet_name = 'artists'
        const file_name = file.originalname
        const file_type = file.mimetype.includes('image') ? 'image' : 'audio'
        const file_size = file.size
        const file_format = file.mimetype.split('/')[1]
        const file_path = `${packet_name}-${file_name}-${file_size}`;
        const imageUrl = await uploadFileToS3(file, packet_name)

        if (!imageUrl) {
            return res.status(404).json({ error: 'Failed to upload artist image' });
        }

        const result = await ArtistRepo.addImage(name, bio, packet_name, file_name, file_type, file_path, file_size, file_format);
        
        if (!result) {
            return res.status(404).json({ error: 'Failed to add artist' });
        }

        res.status(200).json({ message: 'Artist added successfully' });
    }
  
    static async updateArtist(req, res) {
        const { id, name, bio } = req.body;
        const result = await ArtistRepo.updateArtist(id, name, bio);
        if (!result) {
            return res.status(404).json({ error: 'Failed to update artist' });
        }
        res.status(200).json({ message: 'Artist updated successfully' });
    }
  
    static async deleteArtist(req, res) {
        const { id } = req.params;
        const result = await ArtistRepo.deleteArtist(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to delete artist' });
        }
        res.status(200).json({ message: 'Artist deleted successfully' });
    }
  
    static async confirmDeleteArtist(req, res) {
        const { id } = req.params;
        const result = await ArtistRepo.confirmDeleteArtist(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to delete artist' });
        }
        res.status(200).json({ message: 'Artist deleted successfully' });
    }
  
    static async restoreArtist(req, res) {
        const { id } = req.params;
        const result = await ArtistRepo.restoreArtist(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to restore artist' });
        }
        res.status(200).json({ message: 'Artist restored successfully' });
    }
  
    static async trashArtist(req, res) {
        const result = await ArtistRepo.trashArtist();
        if (!result) {
            return res.status(404).json({ error: 'Failed to fetch artists' });
        }
        const trash_artists = await ArtistRepo.getUrl(result);
        res.status(200).json(trash_artists);
    }
}