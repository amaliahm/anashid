import ArtistRepo from "../repos/artist-repo";

export default class ArtistController {

    static async getAllArtists (req, res) {
        const users = await ArtistRepo.getAllArtist();
        if (!users) {
            return res.status(404).json({ error: 'Failed to fetch artist' });
        }
        res.status(200).json(users);
    }

    static async addArtist(req, res) {
        const { id, name, bio } = req.body;
        await ArtistRepo.addArtist(id, name, bio);
        res.status(200).json({ message: 'Artist saved successfully' });
    }
  
    static async updateArtist(req, res) {
        const { id, name, bio } = req.body;
        await ArtistRepo.updateArtist(id, name, bio);
        res.status(200).json({ message: 'Artist updated successfully' });
    }
  
    static async deleteArtist(req, res) {
        const { id } = req.body;
        await ArtistRepo.deleteArtist(id);
        res.status(200).json({ message: 'Artist deleted successfully' });
    }
}