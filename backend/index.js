// app.get('/admin/users/:id', async (req, res) => {
//   try {
//     const conn = await pool.getConnection();
//     const users = await conn.query('SELECT * FROM user;');
//     conn.release();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user' });
//   }
// });

// app.post('/admin/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const { password, userId, account_type } = req.body;
//   const result = await updateUserAccountType(password, userId, account_type, id);
//   res.json(result);
// });

// app.listen(3000, async function () {
//   console.log('Example app listening on port 3000!');
//   console.log('start');
//   await setupDatabase()
//   await createTables()
//   console.log('end');
// });



import express from "express";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";

// // REPOS
import DataBaseRepo from "./database/index.js";
// import EmailRepo from "./repos/email-repo.js";

// // CONFIGS
import { ALLOWED_ORIGINS } from "./configs/config.js";

// // ROUTES
import routes from "./routes/index.js";
import sessionConfig from "./configs/session-config.js";

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sessionConfig);

import "./configs/passport-config.js";

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

DataBaseRepo.setupDatabase(() => {
  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
});