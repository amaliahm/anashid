import ThemeRepo from "../repos/theme-repo.js";

export default class ThemeController {

    static async getAllTheme (req, res) {
        const theme = await ThemeRepo.getAllTheme();
        if (!theme) {
            return res.status(404).json({ error: 'Failed to fetch publicities' });
        }
        res.status(200).json(theme);
    }

    static async addTheme(req, res) {
        const { item } = req.body;
        await ThemeRepo.addTheme(item);
        res.status(200).json({ message: 'Theme added successfully' });
    }
  
    static async deleteTheme(req, res) {
        const { id } = req.params;
        await ThemeRepo.deleteTheme(id);
        res.status(200).json({ message: 'Theme deleted successfully' });
    }
}