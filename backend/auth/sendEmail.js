import config from 'config'
import sgMail from '@sendgrid/mail'

const dbConfig = config.get('sendEmail');

sgMail.setApiKey(dbConfig.SENDGRID_API_KEY);

export const sendVerificationEmail = async (toEmail, verificationLink) => {
  const msg = {
    from: dbConfig.user,
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
