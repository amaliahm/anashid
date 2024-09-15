import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const resetPasswordEmail = async (toEmail, verificationLink) => {
  const msg = {
    from: process.env.SENDGRID_EMAIL,
    to: toEmail,
    subject: 'Password Reset Request',
    text: `You are receiving this because you (or someone else) requested a password reset for your account. Please click on the following link to reset your password: ${verificationLink}`,
    html: `<p>You are receiving this because you (or someone else) requested a password reset for your account. Please click on the following link to reset your password: <a href="${verificationLink}">Verify Email</a></p>`
  };

  try {
    await sgMail.send(msg);
    console.log('Password reset link sent to your email');
  } catch (error) {
    console.error('Error sending reset password email:', error.response ? error.response.body : error);
    throw new Error('Unable to send reset password email');
  }
};
