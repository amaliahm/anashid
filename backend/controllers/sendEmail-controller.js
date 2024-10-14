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

    static async contactEmail (req, res) {
        const { id } = req.params;
        const { subject, content } = req.body;
        const email = await SendEmailRepo.getUserEmail(id);
        if (!email) {
            return res.status(404).json({ error: 'Failed to send email' });
        }

        const message = {
            to: process.env.EMAIL_USER, 
            from: process.env.EMAIL_USER, 
            subject: subject,
            text: `You have received a new email from ${email[0].email}:\n\n${content}`,
            html: `<p> You have received a new email from <strong> ${email[0].email} </strong>: </p> <p> ${content} </p>`, 
        };

        await EmailRepo.contactEmail( message);
        return res.status(200).json({ message: 'Email has been send successfully' });
    }

}