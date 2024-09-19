import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";

// DATABASE
import DataBaseRepo from "../database/index.js";
import { _findUserByEmail, _findUserById } from '../database/queries/auth-queries.js'

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        const user = await DataBaseRepo.queryDatabase(
          _findUserByEmail,
          [email]
        );
        if (!user) {
          return done(null, false, { message: "No user with that email" });
        }
        if (!password || !user[0].password) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
          return done(null, user[0]);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    const user = await DataBaseRepo.queryDatabase(_findUserById, [id]);
    done(null, user);
});