import DataBaseRepo from '../database/index.js'
import { 
    _getEmails, _getUserEmail
} from '../database/queries/sendEmail-queries.js'

export default class SendEmailRepo {

  static async getEmails(id) {
    const rows = await DataBaseRepo.queryDatabase(_getEmails, [id])
    return (rows === null || rows.length > 0) ? rows : null
  }

  static async getUserEmail(id) {
    const rows = await DataBaseRepo.queryDatabase(_getUserEmail, [id])
    return rows
  }
}