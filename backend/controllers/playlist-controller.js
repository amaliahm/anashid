// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

// repos
import PlaylistRepo from '../repos/playlist-repo.js';


export default class PlaylistController {

    static async getPlaylists (req, res) {
        const { id } = req.params
        const playlists = await PlaylistRepo.getPlaylists(id);
        if (!playlists) {
            return res.status(404).json({ error: 'Failed to fetch palylists' });
        }
        const playlists_with_urls = await PlaylistRepo.getUrl(playlists);
        const sanitized_playlists = playlists_with_urls.map(playlist => ({
            ...playlist,
            id: Number(playlist.id),
            anasheed_count: Number(playlist.anasheed_count)
        }))
        res.status(200).json(sanitized_playlists);
    }

    static async addPlaylist(req, res) {
        const { name, id } = req.body;
        const file = req.file

        const packet_name = 'playlists'
        const file_name = file.originalname
        const file_type = file.mimetype.includes('image') ? 'image' : 'audio'
        const file_size = file.size
        const file_format = file.mimetype.split('/')[1]
        const file_path = `${packet_name}-${file_name}-${file_size}`;
        const imageUrl = await uploadFileToS3(file, packet_name)

        await PlaylistRepo.addImage(name, packet_name, file_name, file_type, file_path, file_size, file_format, id);
        res.status(200).json({ message: 'Playlist added successfully' });
    }
  
    static async deletePlaylist(req, res) {
        const { id } = req.params;
        await PlaylistRepo.deletePlaylist(id);
        res.status(200).json({ message: 'Playlist deleted successfully' });
    }

    static async addToPlaylist (req, res) {
        const { id, id_nasheed } = req.body
        await PlaylistRepo.addToPlaylist(id, id_nasheed);
        res.status(200).json({ message: 'Nasheed added to playlist successfully' });
    }

    static async removeFromPlaylist (req, res) {
        const { anasheed_playlist_id } = req.params
        await PlaylistRepo.removeFromPlaylist(anasheed_playlist_id);
        res.status(200).json({ message: 'Nasheed removed from playlist successfully' });
    }
}