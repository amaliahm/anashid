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
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from './auth/sendEmail.js';

initialize(passport);

var app = express();

app.use(cors({
  origin: 'http://localhost:5173',  
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
        
            await conn.query(
                register_with_email,
              [data.username, email, hashedPassword]
            );

            const verificationToken = jwt.sign({ email }, 'secret', { expiresIn: '1h' });

            // Send verification email
            await sendVerificationEmail(email, verificationToken);
        
            conn.release();
            res.status(201).json({ message: 'User created successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Please verify your information and try again' });
          }
    }
    
})

app.post('/auth/verify-email', async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Update the user's status to "verified"
    const conn = await pool.getConnection();
    await conn.query('UPDATE user SET is_verified = true WHERE email = ?', [email]);
    conn.release();

    res.json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Email verification failed:', error);
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
});


app.listen(3000, async function () {
  console.log('Example app listening on port 3000!');
  console.log('start');
  await setupDatabase()
  await createTables()
  console.log('end');
});