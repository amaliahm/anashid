import GenderRepo from "../repos/gender-repo.js";

export default class GenderController {

    static async getAllGender (req, res) {
        const gender = await GenderRepo.getAllGender();
        if (!gender) {
            return res.status(404).json({ error: 'Failed to fetch publicities' });
        }
        res.status(200).json(gender);
    }

    static async addGender(req, res) {
        const { item } = req.body;
        await GenderRepo.addGender(item);
        res.status(200).json({ message: 'Gender added successfully' });
    }
  
    static async deleteGender(req, res) {
        const { id } = req.params;
        await GenderRepo.deleteGender(id);
        res.status(200).json({ message: 'Gender deleted successfully' });
    }
}