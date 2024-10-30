// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

// repos
import CategoryRepo from "../repos/category-repo.js";


export default class CategoryController {

    static async getAllCategories (req, res) {
        const categories = await CategoryRepo.getAllCategory();
        if (!categories) {
            return res.status(404).json({ error: 'Failed to fetch categories' });
        }
        const categories_with_urls = await CategoryRepo.getUrl(categories);
        const sanitized_categories = categories_with_urls.map(category => ({
            ...category,
            id: Number(category.id),
            anasheed_count: Number(category.anasheed_count)
        }))
        res.status(200).json(sanitized_categories);
    }

    static async addCategory(req, res) {
        const { name } = req.body;
        const file = req.file

        const packet_name = 'categories'
        const file_name = file.originalname
        const file_type = file.mimetype.includes('image') ? 'image' : 'audio'
        const file_size = file.size
        const file_format = file.mimetype.split('/')[1]
        const file_path = `${packet_name}-${file_name}-${file_size}`;
        const imageUrl = await uploadFileToS3(file, packet_name)

        if (!imageUrl) {
            return res.status(404).json({ error: 'Failed to upload category image' });
        }

        const result = await CategoryRepo.addImage(name, packet_name, file_name, file_type, file_path, file_size, file_format);

        if (!result) {
            return res.status(404).json({ error: 'Failed to add category' });
        }

        res.status(200).json({ message: 'Category added successfully' });
    }
  
    static async updateCategory(req, res) {
        const { id, name } = req.body;
        const result = await CategoryRepo.updateCategory(id, name);
        if (!result) {
            return res.status(404).json({ error: 'Failed to update category' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    }
  
    static async deleteCategory(req, res) {
        const { id } = req.params;
        const category = await CategoryRepo.deleteCategory(id);
        if (!category) {
            return res.status(404).json({ error: 'Failed to delete category' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    }
  
    static async confirmDeleteCategory(req, res) {
        const { id } = req.params;
        const result = await CategoryRepo.confirmDeleteCategory(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to delete category' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    }
  
    static async trashCategory(req, res) {
        const result = await CategoryRepo.trashCategory();
        if (!result) {
            return res.status(404).json({ error: 'Failed to fetch categories' });
        }
        const trash_categories = await CategoryRepo.getUrl(result);
        res.status(200).json(trash_categories);
    }
  
    static async restoreCategory(req, res) {
        const { id } = req.params;
        const result = await CategoryRepo.restoreCategory(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to fetch categories' });
        }
        res.status(200).json({ message: 'Category restored successfully' });
    }
}