import dotenv from "dotenv";

dotenv.config();

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGIN.split(",")

export const DATABASE = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

export const SMTP = {
    host: process.env.SMTP_HOST_NAME,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD
}

export const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL