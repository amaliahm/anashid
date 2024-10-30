import LanguageRepo from "../repos/language-repo.js";

export default class LanguageController {

    static async getAllLanguage (req, res) {
        const language = await LanguageRepo.getAllLanguage();
        if (!language) {
            return res.status(404).json({ error: 'Failed to fetch languages' });
        }
        res.status(200).json(language);
    }

    static async addLanguage(req, res) {
        const { item } = req.body;
        const result = await LanguageRepo.addLanguage(item);
        if (!result) {
            return res.status(404).json({ error: 'Failed to add language' });
        }
        res.status(200).json({ message: 'Language added successfully' });
    }
  
    static async deleteLanguage(req, res) {
        const { id } = req.params;
        const result = await LanguageRepo.deleteLanguage(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to delete language' });
        }
        res.status(200).json({ message: 'Language deleted successfully' });
    }
}