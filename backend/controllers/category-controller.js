import CategoryRepo from "../repos/category-repo";

export default class CategoryController {

    static async getAllCategorys (req, res) {
        const users = await CategoryRepo.getAllCategory();
        if (!users) {
            return res.status(404).json({ error: 'Failed to fetch category' });
        }
        res.status(200).json(users);
    }

    static async addCategory(req, res) {
        const { id, name } = req.body;
        await CategoryRepo.addCategory(id, name);
        res.status(200).json({ message: 'Category saved successfully' });
    }
  
    static async updateCategory(req, res) {
        const { id, name } = req.body;
        await CategoryRepo.updateCategory(id, name);
        res.status(200).json({ message: 'Category updated successfully' });
    }
  
    static async deleteCategory(req, res) {
        const { id } = req.body;
        await CategoryRepo.deleteCategory(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    }
}