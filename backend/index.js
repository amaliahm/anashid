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
            const conn = await pool.getConnection();
            const [existingUser] = await conn.query('SELECT * FROM user WHERE email = ?', [data.email]);
            if (existingUser) {
              return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
        
            await conn.query(
                register_with_email,
              [data.username, data.email, hashedPassword]
            );
        
            conn.release();
            res.status(201).json({ message: 'User created successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
          }
    }
    
})

app.listen(3000, async function () {
  console.log('Example app listening on port 3000!');
  console.log('start');
  await setupDatabase()
  await createTables()
  console.log('end');
});