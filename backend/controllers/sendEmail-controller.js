// REPOS
import EmailRepo from "../repos/email-repo.js";
import SendEmailRepo from '../repos/sendEmail-repo.js';

export default class SendEmailController {

    static async sendEmail (req, res) {
        const { id } = req.params;
        const { subject, content } = req.body;
        const emails = await SendEmailRepo.getEmails(id);
        if (!emails) {
            return res.status(404).json({ error: 'Failed to fetch emails' });
        }
        emails.forEach( async (email) => {
            await EmailRepo.sendEmail(
                email.email, 
                subject,
                content,
                `<p> ${content} </p>`
              );
        })
        return res.status(200).json({ message: 'Emails have been send successfully', table: 'sendEmail' });
    }

}