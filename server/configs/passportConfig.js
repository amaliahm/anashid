import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";
import DataBaseRepo from "../database/index.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await DataBaseRepo.query(
          "SELECT * FROM user WHERE email = ?",
          [email]
        );

        // conn.release();
        if (!user) {
          return done(null, false, { message: "No user with that email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const conn = await pool.getConnection();
    const [user] = await conn.query("SELECT * FROM user WHERE id = ?", [id]);
    conn.release();
    done(null, user);
  } catch (error) {
    done(error);
  }
});
