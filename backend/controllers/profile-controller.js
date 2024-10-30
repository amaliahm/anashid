// s3
import { uploadFileToS3 } from '../configs/aws-config.js'

// repos
import ProfileRepo from '../repos/profile-repo.js';


export default class ProfileController {

    static async addProfilePhoto(req, res) {
        const { id } = req.params;
        const file = req.file
        
        const packet_name = 'user'
        const file_name = file.originalname
        const file_type = file.mimetype.includes('image') ? 'image' : 'audio'
        const file_size = file.size
        const file_format = file.mimetype.split('/')[1]
        const file_path = `${packet_name}-${file_name}-${file_size}`;
        const imageUrl = await uploadFileToS3(file, packet_name)

        if (!imageUrl) {
            return res.status(404).json({ error: 'Failed to upload the user profile image' });
        }

        const user = await ProfileRepo.findUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Failed to add user profile image' });
        }
        if (!user[0].id_file) {
            const result = await ProfileRepo.addImage(packet_name, file_name, file_type, file_path, file_size, file_format, id);
            if (!result) {
                return res.status(404).json({ error: 'Failed to add user profile image' });
            }
            return res.json(result);
        }
        const result = await ProfileRepo.updateImage(packet_name, file_name, file_type, file_path, file_size, file_format, user[0].id_file, user[0].file_path);
        if (!result) {
            return res.status(404).json({ error: 'Failed to update user profile image' });
        }
        res.json(result);
    }

    static getUser = async (req, res) => {
        const { id } = req.params

        const user = await ProfileRepo.findUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Failed to fetch user data' });
        }
        if (!user[0].id_file) {
            res.status(200).json(user[0]);
        }
        const user_with_url = await ProfileRepo.getUrl(user);
        if (!user_with_url) {
            return res.status(404).json({ error: 'Failed to fetch user data' });
        }
        res.status(200).json(user_with_url);
    }
}