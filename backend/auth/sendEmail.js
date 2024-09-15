import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = async (toEmail, verificationLink) => {
  const msg = {
    from: process.env.SENDGRID_EMAIL,
    to: toEmail,
    subject: 'Verify Your Account',
    text: `Please verify your account by clicking on the following link: ${verificationLink}`,
    html: `<p>Please verify your account by clicking on the following link: <a href="${verificationLink}">Verify Email</a></p>`
  };

  try {
    await sgMail.send(msg);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error.response ? error.response.body : error);
    throw new Error('Unable to send verification email');
  }
};
