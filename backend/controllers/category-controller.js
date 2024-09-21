import CategoryRepo from "../repos/category-repo.js";
import { uploadFileToS3 } from '../configs/aws-config.js'
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class CategoryController {

    static async getAllCategories (req, res) {
        const categories = await CategoryRepo.getAllCategory();
        if (!categories) {
            return res.status(404).json({ error: 'Failed to fetch categories' });
        }
        const categories_with_urls = await Promise.all(categories.map(async (category) => {
            const url = await getSignedUrl(s3client, new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: category.file_path,
            }), {
                expiresIn: 3600
            })
            return {
                ...category,
                file_path: url,
            };
        }));
        res.status(200).json(categories_with_urls);
    }

    static async addCategory(req, res) {
        const { name } = req.body;
        const file = req.file

        const imageUrl = await uploadFileToS3(file)
        const packet_name = 'categories'
        const file_name = file.originalname
        const file_type = file.mimetype.includes('image') ? 'image' : 'audio'
        const file_size = file.size
        const file_format = file.mimetype.split('/')[1]
        const file_path = `/${packet_name}/${file_name}`;

        await CategoryRepo.addImage(name, packet_name, file_name, file_type, file_path, file_size, file_format);
        res.status(200).json({ message: 'Category added successfully' });
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