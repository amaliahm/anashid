import LanguageRepo from "../repos/language-repo.js";

export default class LanguageController {

    static async getAllLanguage (req, res) {
        const language = await LanguageRepo.getAllLanguage();
        if (!language) {
            return res.status(404).json({ error: 'Failed to fetch publicities' });
        }
        res.status(200).json(language);
    }

    static async addLanguage(req, res) {
        const { item } = req.body;
        await LanguageRepo.addLanguage(item);
        res.status(200).json({ message: 'Language added successfully' });
    }
  
    static async deleteLanguage(req, res) {
        const { id } = req.params;
        await LanguageRepo.deleteLanguage(id);
        res.status(200).json({ message: 'Language deleted successfully' });
    }
}