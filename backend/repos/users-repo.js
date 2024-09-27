import DataBaseRepo from "../database/index.js"
import { _getAllUsers, _updateUserAcountType } from "../database/queries/users-queries.js"
import { _findUserById } from "../database/queries/auth-queries.js"

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


export default class UsersRepo {

    static async getAllUsers() {
        const users = await DataBaseRepo.queryDatabase(_getAllUsers, [])
        return (users === null || users.length > 0) ? users : null
    }

    static async findUserById(adminId) {
        const user = await DataBaseRepo.queryDatabase(_findUserById, [adminId])
        return (user === null || user.length > 0) ? user[0] : null
    }

    static async updateUserAccountType(account_type, userId) {
        await DataBaseRepo.queryDatabase(_updateUserAcountType, [account_type, userId])
    }

    static async getUrl(result) {
        const url = await Promise.all(result.map(async (elem) => {
          if (!elem.file_path) {
              return elem
          }
          const url = await getSignedUrl(s3client, new GetObjectCommand({
              Bucket: process.env.BUCKET_NAME,
              Key: elem.file_path,
          }), {
              expiresIn: 3600
          })
          return {
              ...elem,
              file_path: url,
          };
        }));
        return url
    }    
}