import nodemailer from 'nodemailer';
import config from 'config'

const dbConfig = config.get('email');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: dbConfig.user, 
    pass: dbConfig.password,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: dbConfig.user,
    to: email,
    subject: 'Verify Your Account',
    text: `Please verify your account by clicking on the following link: ${verificationLink}`,
    html: `<p>Please verify your account by clicking on the following link: <a href="${verificationLink}">Verify Email</a></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Unable to send verification email');
  }
};
