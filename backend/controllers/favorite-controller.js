// repos
import FavoriteRepo from "../repos/favorite-repo.js";

export default class FavoriteController {

    static async getFavorite (req, res) {
        const { id_user } = req.params
        const favoriteAnasheed = await FavoriteRepo.getFavorite(id_user);
        if (!favoriteAnasheed) {
            return res.status(404).json({ message: 'No data to display' });
        }
        const anasheed_with_urls = await FavoriteRepo.getUrl(favoriteAnasheed);
        if (!anasheed_with_urls) {
            return res.status(404).json({ message: 'No data to display' });
        }
        const anasheed_with_audios = await FavoriteRepo.getAudioUrl(anasheed_with_urls);
        if (!anasheed_with_audios) {
            return res.status(404).json({ message: 'No data to display' });
        }
        res.status(200).json(anasheed_with_audios);
    }
  
    static async addToFavorite(req, res) {
        const { id_user, id_anasheed } = req.body;
        const result = await FavoriteRepo.addToFavorite(id_user, id_anasheed);
        if (!result) {
            return res.status(404).json({ message: 'No data to display' });
        }
        res.status(200).json({ message: 'This nasheed is added from favorite successfully' });
    }
  
    static async removeFromFavorite(req, res) {
        const { id_user, id_anasheed } = req.body;
        const result = await FavoriteRepo.removeFromFavorite(id_user, id_anasheed);
        if (!result) {
            return res.status(404).json({ message: 'No data to display' });
        }
        res.status(200).json({ message: 'This nasheed is deleted from favorite successfully' });
    }
}