import GenderRepo from "../repos/gender-repo.js";

export default class GenderController {

    static async getAllGender (req, res) {
        const gender = await GenderRepo.getAllGender();
        if (!gender) {
            return res.status(404).json({ error: 'Failed to fetch genders' });
        }
        res.status(200).json(gender);
    }

    static async addGender(req, res) {
        const { item } = req.body;
        const result = await GenderRepo.addGender(item);
        if (!result) {
            return res.status(404).json({ error: 'Failed to add gender' });
        }
        res.status(200).json({ message: 'Gender added successfully' });
    }
  
    static async deleteGender(req, res) {
        const { id } = req.params;
        const result = await GenderRepo.deleteGender(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to delete gender' });
        }
        res.status(200).json({ message: 'Gender deleted successfully' });
    }
}