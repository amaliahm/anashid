// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

// repos
import ProfileRepo from '../repos/profile-repo.js';


export default class ProfileController {

    static async addProfilePhoto(req, res) {
        const { id } = req.body;
        const file = req.file
        
        const packet_name = 'user'
        const file_name = file.originalname
        const file_type = file.mimetype.includes('image') ? 'image' : 'audio'
        const file_size = file.size
        const file_format = file.mimetype.split('/')[1]
        const file_path = `${packet_name}-${file_name}-${file_size}`;
        const imageUrl = await uploadFileToS3(file, packet_name)

        const user = await ProfileRepo.findUserById(id);
        if (!user) {
            const result = await ProfileRepo.addImage(packet_name, file_name, file_type, file_path, file_size, file_format, id);
            return res.json(result);
        }
        const result = await ProfileRepo.updateImage(packet_name, file_name, file_type, file_path, file_size, file_format, user[0].id_file, user[0].file_path);
        res.json(result);
    }

    static getUser = async (req, res) => {
        const { id } = req.params

        const user = await ProfileRepo.findUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Failed to fetch artists' });
        }
        const user_with_url = await ProfileRepo.getUrl(user);
        res.status(200).json(user_with_url);
    }
}