import express from 'express'
import { setupDatabase } from './dbConnection/dbConnection.js';
import createTables from './tables/main.js';
import cors from 'cors';
import { initialize } from './auth/passport-config.js';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import { register_with_email } from './auth/registerEmail.js';
import { pool } from './dbConnection/dbConnection.js';
import { sendVerificationEmail } from './auth/sendEmail.js';
import { findUserByEmail } from './auth/findUserByEmail.js';
import { markUserAsVerified } from './auth/VerifyUser.js';
import { userLogin } from './auth/userLogin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resetPasswordEmail } from './auth/resetPasswordEmail.js';
import { changePassword } from './auth/changePassword.js';
import updateUserAccountType from './operation/updateUserAccountType.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

initialize(passport);

var app = express();

app.use(cors({
  origin: 'http://localhost:5173', // to update 
  methods: 'GET,POST,PUT,DELETE',  
  credentials: true
}));
  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/auth/signup', async (req, res) => {
    const data = req.body;
    console.log(data)
    if (data.account_name === 'email') {
        try {
            const email = data.email
            const conn = await pool.getConnection();
            const [existingUser] = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
            if (existingUser) {
              return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const verificationLink = `http://localhost:5173/auth/verify-email/${email}`;
            await sendVerificationEmail(email, verificationLink);
            await conn.query(
              register_with_email,
            [data.username, email, hashedPassword]
          );
            conn.release();
            res.status(201).json({ message: 'User created successfully, please verify your email' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Please verify your information and try again' });
          }
    }
})

app.post('/auth/verify-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email); 
    if (!user) {
      return res.status(400).json({ message: 'User not found or invalid email' });
    }
    await markUserAsVerified(user);
    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying email' });
  }
});

app.post('/auth/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
      if (err) {
          return res.status(500).json({ message: 'Please verify your information and try again' });
      }
      if (!user) {
          return res.status(401).json({ message: info.message });
      }
      req.logIn(user, async (err) => {
          if (err) {
              return res.status(500).json({ message: 'Please verify your information and try again' });
          }
          const conn = await pool.getConnection();
          await conn.query(userLogin, [user.id]);
          conn.release();
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          return res.status(200).json({ message: 'Login successful', user, token });
      });
  })(req, res, next);
});

app.post('/', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
      if (err) {
          return res.status(500).json({ message: 'Please verify your information and try again' });
      }
      if (!user) {
          return res.status(401).json({ message: info.message });
      }
      if (user.account_type !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only' });
      }
      req.logIn(user, async (err) => {
          if (err) {
              return res.status(500).json({ message: 'Please verify your information and try again' });
          }
          const conn = await pool.getConnection();
          await conn.query(userLogin, [user.id]);
          conn.release();
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          return res.status(200).json({ message: 'Login successful', user, token });
      });
  })(req, res, next);
});

app.post('/forget-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email); 
    if (!user) {
      return res.status(400).json({ message: 'User not found or invalid email' });
    }
    const verificationLink = `http://localhost:5173/auth/reset-password/${email}`;
    await resetPasswordEmail(email, verificationLink);
    return res.status(200).json({ message: 'Email send successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error, please try again!' });
  }
});

app.post('/auth/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await findUserByEmail(token); 
    if (!user) {
      return res.status(400).json({ message: 'User not found or invalid email' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await changePassword(hashedPassword, user.id)
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error, please try again!' });
  }
});

app.get('/admin/users/:id', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const users = await conn.query('SELECT * FROM user;');
    conn.release();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  const { password, userId, account_type } = req.body;
  const result = await updateUserAccountType(password, userId, account_type, id);
  res.json(result);
});

app.listen(3000, async function () {
  console.log('Example app listening on port 3000!');
  console.log('start');
  await setupDatabase()
  await createTables()
  console.log('end');
});