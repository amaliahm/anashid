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

  static async addAnasheed(req, res) {
      const { title, description, duration, id_artist, id_language, id_theme, id_gender, id_category } = req.body;
      const { photo, audio } = req.files;

      var packet_name = 'anasheed-images'
      var file_name = photo[0].originalname
      var file_type = "image"
      var file_size = photo[0].size
      var file_format = photo[0].mimetype.split('/')[1]
      var file_path = `${packet_name}-${file_name}-${file_size}`;
      await uploadFileToS3(photo[0], packet_name)

      const image = await AnasheedRepo.addFileAttachment(packet_name, file_name, file_type, file_path, file_size, file_format);

      packet_name = 'anasheed-audio'
      file_name = audio[0].originalname
      file_type= 'audio'
      file_size = audio[0].size
      file_format = audio[0].mimetype.split('/')[1]
      file_path = `${packet_name}-${file_name}-${file_size}`;
      await uploadFileToS3(audio[0], packet_name)

      const onshouda = await AnasheedRepo.addFileAttachment(packet_name, file_name, file_type, file_path, file_size, file_format);

      await AnasheedRepo.addAnasheed(title, description, duration, id_artist, id_language, id_theme, id_gender, id_category, image.id, onshouda.id)
      
      res.status(200).json({ message: 'Anasheed saved successfully' });
  }

  static async updateAnasheed(req, res) {
      const { id, title, description } = req.body;
      await AnasheedRepo.updateAnasheed(id, title, description);
      res.status(200).json({ message: 'Audio updated successfully' });
  }

  static async deleteAnasheed(req, res) {
      const { id } = req.params;
      await AnasheedRepo.deleteAnasheed(id);
      res.status(200).json({ message: 'Audio deleted successfully' });
  }

  static async confirmDeleteAnasheed(req, res) {
    const { id } = req.params;
    await AnasheedRepo.confirmDeleteAnasheed(id);
    res.status(200).json({ message: 'Anasheed deleted successfully' });
  }
  
  static async restoreAnasheed(req, res) {
      const { id } = req.params;
      await AnasheedRepo.restoreAnasheed(id);
      res.status(200).json({ message: 'Anasheed restored successfully' });
  }

  static async trashAnasheed(req, res) {
    const result = await AnasheedRepo.trashAnasheed();
    if (!result) {
        return res.status(404).json({ error: 'Failed to fetch anasheed' });
    }
    const trash_anasheed = await AnasheedRepo.getUrl(result);
    res.status(200).json(trash_anasheed);
  }

  static async getCategoryAnasheed(req, res) {
    const { id } = req.params
    const anasheed = await AnasheedRepo.getCategoryAnasheed(id);
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    const anasheed_with_urls = await AnasheedRepo.getUrl(anasheed);
    const anasheed_with_audios = await AnasheedRepo.getAudioUrl(anasheed_with_urls);
    return res.status(200).json(anasheed_with_audios);
  }
}