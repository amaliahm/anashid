import AnasheedRepo from "../repos/anasheed-repo.js";

// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

export default class AnasheedController {

  static async getAllAnasheed(req, res) {
    const anasheed = await AnasheedRepo.getAllAnasheed();
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed);
    const anasheed_with_audios = await AnasheedRepo.getAudioUrl(anasheed_with_urls);
    return res.status(200).json(anasheed_with_audios);
  }

  static async getAllAnasheedWithFavorite(req, res) {
    const { id } = req.params
    const anasheed = await AnasheedRepo.getAllAnasheed();
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_favorites = await AnasheedRepo.getWithFavorite(id, anasheed);
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed_with_favorites);
    const anasheed_with_audios = await AnasheedRepo.getAudioUrl(anasheed_with_urls);
    return res.status(200).json(anasheed_with_audios);
  }

  static async addAnasheed(req, res) {
      const { title, description, duration, id_artist, id_language, id_theme, id_gender, id_category } = req.body;
      const { photo, audio } = req.files;

      var packet_name = 'anasheed-images'
      var file_name = photo[0].originalname
      var file_type = "image"
      var file_size = photo[0].size
      var file_format = photo[0].mimetype.split('/')[1]
      var file_path = `${packet_name}-${file_name}-${file_size}`;
      const upload_result = await uploadFileToS3(photo[0], packet_name)

      if (!upload_result) {
        return res.status(500).json({ error: 'Failed to upload nasheed image' });
      }

      const image = await AnasheedRepo.addFileAttachment(packet_name, file_name, file_type, file_path, file_size, file_format);

      if (!image) {
        return res.status(500).json({ error: 'Failed to save nasheed image' });
      }

      packet_name = 'anasheed-audio'
      file_name = audio[0].originalname
      file_type= 'audio'
      file_size = audio[0].size
      file_format = audio[0].mimetype.split('/')[1]
      file_path = `${packet_name}-${file_name}-${file_size}`;
      const upload_audio = await uploadFileToS3(audio[0], packet_name)

      if (!upload_audio) {
        return res.status(500).json({ error: 'Failed to upload nasheed audio' });
      }

      const onshouda = await AnasheedRepo.addFileAttachment(packet_name, file_name, file_type, file_path, file_size, file_format);

      if (!onshouda) {
        return res.status(500).json({ error: 'Failed to save nasheed audio' });
      }

      const final_result = await AnasheedRepo.addAnasheed(title, description, duration, id_artist, id_language, id_theme, id_gender, id_category, image.id, onshouda.id)

      if (!final_result) {
        return res.status(404).json({ error: 'Failed to add this nasheed' });
      }
      
      res.status(200).json({ message: 'Nasheed added successfully' });
  }

  static async updateAnasheed(req, res) {
      const { id, title, description } = req.body;
      const result = await AnasheedRepo.updateAnasheed(id, title, description);
      if (!result) {
        return res.status(404).json({ error: 'Failed to update this nasheed' });
      }
      res.status(200).json({ message: 'Nasheed updated successfully' });
  }

  static async deleteAnasheed(req, res) {
      const { id } = req.params;
      const result = await AnasheedRepo.deleteAnasheed(id);
      if (!result) {
        return res.status(404).json({ error: 'Failed to delete this nasheed' });
      }
      res.status(200).json({ message: 'Nasheed deleted successfully' });
  }

  static async confirmDeleteAnasheed(req, res) {
    const { id } = req.params;
    const result = await AnasheedRepo.confirmDeleteAnasheed(id);
    if (!result) {
      return res.status(404).json({ error: 'Failed to delete this nasheed' });
    }
    res.status(200).json({ message: 'Anasheed deleted successfully' });
  }
  
  static async restoreAnasheed(req, res) {
      const { id } = req.params;
      const result = await AnasheedRepo.restoreAnasheed(id);
      if (!result) {
        return res.status(404).json({ error: 'Failed to restore anasheed' });
      }
      res.status(200).json({ message: 'Anasheed restored successfully' });
  }

  static async trashAnasheed(req, res) {
    console.log('hey')
    const result = await AnasheedRepo.trashAnasheed();
    console.log('result')
    console.log(result)
    if (!result) {
        return res.status(404).json({ error: 'Failed to fetch anasheed' });
    }
    const trash_anasheed = await AnasheedRepo.getUrl(result);
    console.log('trash_anasheed')
    console.log(trash_anasheed)
    res.status(200).json(trash_anasheed);
  }

  static async getCategoryAnasheed(req, res) {
    const { id, user } = req.params
    const anasheed = await AnasheedRepo.getCategoryAnasheed(id);
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_favorites = await AnasheedRepo.getWithFavorite(user, anasheed);
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed_with_favorites);
    const anasheed_with_audios = await AnasheedRepo.getAudioUrl(anasheed_with_urls);
    return res.status(200).json(anasheed_with_audios);
  }

  static async getArtistAnasheed(req, res) {
    const { id, user } = req.params
    const anasheed = await AnasheedRepo.getArtistAnasheed(id);
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_favorites = await AnasheedRepo.getWithFavorite(user, anasheed);
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed_with_favorites);
    const anasheed_with_audios = await AnasheedRepo.getAudioUrl(anasheed_with_urls);
    return res.status(200).json(anasheed_with_audios);
  }

  static async getPlaylistAnasheed(req, res) {
    const { id, id_playlist } = req.params
    const anasheed = await AnasheedRepo.getPlaylistAnasheed(id, id_playlist);
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_favorites = await AnasheedRepo.getWithFavorite(id, anasheed);
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed_with_favorites);
    const anasheed_with_audios = await AnasheedRepo.getAudioUrl(anasheed_with_urls);
    return res.status(200).json(anasheed_with_audios);
  }

  static async getNewAnasheed(req, res) {
    const anasheed = await AnasheedRepo.getNewAnasheed();
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed);
    return res.status(200).json(anasheed_with_urls);
  }

  static async getTrendingAnasheed(req, res) {
    const anasheed = await AnasheedRepo.getTrendingAnasheed();
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed);
    return res.status(200).json(anasheed_with_urls);
  }
}