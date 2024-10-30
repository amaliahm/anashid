// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

// repos
import PublicityRepo from "../repos/publicity-repo.js";


export default class PublicityController {

    static async getAllPublicity (req, res) {
        const publicity = await PublicityRepo.getAllPublicity();
        if (!publicity) {
            return res.status(404).json({ error: 'Failed to fetch publicities' });
        }
        const publicities_with_urls = await PublicityRepo.getUrl(publicity);
        if (!publicities_with_urls) {
            return res.status(404).json({ error: 'Failed to fetch publicities' });
        }
        res.status(200).json(publicities_with_urls);
    }

    static async addPublicity(req, res) {
        const file = req.file

        const packet_name = 'publicities'
        const file_name = file.originalname
        const file_type = file.mimetype.includes('image') ? 'image' : 'audio'
        const file_size = file.size
        const file_format = file.mimetype.split('/')[1]
        const file_path = `${packet_name}-${file_name}-${file_size}`;
        const imageUrl = await uploadFileToS3(file, packet_name)

        if (!imageUrl) {
            return res.status(404).json({ error: 'Failed to add publicity' });
        }

        const result = await PublicityRepo.addImage(packet_name, file_name, file_type, file_path, file_size, file_format);
        if (!result) {
            return res.status(404).json({ error: 'Failed to add publicity' });
        }
        res.status(200).json({ message: 'publicity added successfully' });
    }
  
    static async deletePublicity(req, res) {
        const { id } = req.params;
        const result = await PublicityRepo.deletePublicity(id);
        if (!result) {
            return res.status(404).json({ error: 'Failed to delete publicity' });
        }
        res.status(200).json({ message: 'Publicity deleted successfully' });
    }
}