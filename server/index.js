import express from "express";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";

// REPOS
import DataBaseRepo from "./database/index.js";
import EmailRepo from "./repos/emailRepo.js";

// CONFIGS
import { ALLOWED_ORIGIN } from "./configs/config.js";

// ROUTES
import routes from "./routes/index.js";
import sessionConfig from "./configs/sessionConfig.js";

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credential: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sessionConfig);

import "./configs/passportConfig.js";
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

EmailRepo.sendEmail(
    "manipulatorrika@gmail.com",
    "test from send grid",
    "hello from send grid"
  );
  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });

// DataBaseRepo.setupDatabase(() => {
  
// });
