import ThemeRepo from "../repos/theme-repo.js";

export default class ThemeController {

    static async getAllTheme (req, res) {
        const theme = await ThemeRepo.getAllTheme();
        if (!theme) {
            return res.status(404).json({ error: 'Failed to fetch themes' });
        }
        res.status(200).json(theme);
    }

    static async addTheme(req, res) {
        const { item } = req.body;
        const result = await ThemeRepo.addTheme(item);
        if (!result) {
            return res.status(404).json({ error: 'Failed to add theme' });
        }
        res.status(200).json({ message: 'Theme added successfully' });
    }
  
    static async deleteTheme(req, res) {
        const { id } = req.params;
        const result = await ThemeRepo.deleteTheme(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to delete theme' });
        }
        res.status(200).json({ message: 'Theme deleted successfully' });
    }
}