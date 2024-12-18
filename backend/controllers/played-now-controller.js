// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

// repos
import PlayedNowRepo from '../repos/played-now-repo.js';


export default class PlayedNowController {

    static async getAllListening(req, res) {
        const { id_user } = req.params;
        const history = await PlayedNowRepo.getListening(id_user);
        if (!history) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const history_with_favorites = await PlayedNowRepo.getWithFavorite(id_user, history);
        if (!history_with_favorites) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const history_with_urls = await PlayedNowRepo.getUrl(history_with_favorites, 'file_path');
        if (!history_with_urls) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const groupByDate = history_with_urls.reduce((acc, anasheed) => {
          const date = new Date(anasheed.listening_date);
          const formattedDate = date.toLocaleDateString('en-GB')
          if (!acc[formattedDate]) acc[formattedDate] = [];
          acc[formattedDate].push(anasheed);
          return acc;
        }, {});
        return res.status(200).json(groupByDate);
    }

    static async getLastListening(req, res) {
        const { id_user } = req.params;
        const history = await PlayedNowRepo.getLastListening(id_user);
        if (!history) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const history_with_favorites = await PlayedNowRepo.getWithFavorite(id_user, history);
        if (!history_with_favorites) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const history_with_urls = await PlayedNowRepo.getUrl(history_with_favorites, 'file_path');
        if (!history_with_urls) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const history_with_category = await PlayedNowRepo.getUrl(history_with_urls, 'category_image');
        if (!history_with_category) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const history_with_artist = await PlayedNowRepo.getUrl(history_with_category, 'artist_image');
        if (!history_with_artist) {
          return res.status(404).json({ message: 'No data to display' });
        }
        const history_with_audios = await PlayedNowRepo.getAudioUrl(history_with_artist);
        if (!history_with_audios) {
          return res.status(404).json({ message: 'No data to display' });
        }
        return res.status(200).json(history_with_audios);
    }
    
    static async addListening(req, res) {
        const { id_anasheed, id_user, position } = req.body;  
        const result = await PlayedNowRepo.addListening(id_user, id_anasheed, position)
        if (!result) {
          return res.status(404).json({ message: 'failed to add listening' });
        }
        res.status(200).json({ message: 'This nasheed saved successfully' });
    }
}