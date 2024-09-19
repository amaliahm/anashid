import session from "express-session";
import { SESSION_SECRET } from "./config.js";

export default session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});