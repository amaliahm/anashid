// repos
import FavoriteRepo from "../repos/favorite-repo.js";

export default class FavoriteController {

    static async getFavorite (req, res) {
        const { id_user } = req.params
        const favoriteAnasheed = await FavoriteRepo.getFavorite(id_user);
        res.status(200).json(favoriteAnasheed);
    }
  
    static async addToFavorite(req, res) {
        const { id_user, id_anasheed } = req.body;
        await FavoriteRepo.addToFavorite(id_user, id_anasheed);
        res.status(200).json({ message: 'This anasheed is added from favorite successfully' });
    }
  
    static async removeFromFavorite(req, res) {
        const { id_user, id_anasheed } = req.body;
        await FavoriteRepo.removeFromFavorite(id_user, id_anasheed);
        res.status(200).json({ message: 'This anasheed is deleted from favorite successfully' });
    }
}