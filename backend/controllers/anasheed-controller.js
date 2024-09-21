import AnasheedRepo from "../repos/anasheed-repo.js";

export default class AnasheedController {

  static async getAllAnasheed(req, res) {
    const anasheed = await AnasheedRepo.getAllAnasheed();
    if (!anasheed) {
      return res.status(404).json({ message: 'No data to display' });
    }
    return res.status(200).json({ message: 'Fetch anasheed successfully' });
  }

  static async addAnasheed(req, res) {
      const { id, title, description, audio } = req.body;

      if (!file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }


      /// save file to database
      res.status(200).json({ message: 'Audio saved successfully' });
  }

  static async updateAnasheed(req, res) {
      const { id, title, description } = req.body;
      await AnasheedRepo.updateAnasheed(id, title, description);
      res.status(200).json({ message: 'Audio updated successfully' });
  }

  static async deleteAnasheed(req, res) {
      const { id } = req.body;
      await AnasheedRepo.deleteAnasheed(id);
      res.status(200).json({ message: 'Audio deleted successfully' });
  }
}