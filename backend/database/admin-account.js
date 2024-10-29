import { SENDGRID_EMAIL } from "../configs/config.js";

export const adminAccount = `
  INSERT IGNORE INTO 
    user 
    (username, email, password, account_name, created_at, last_login, account_type)
  VALUES 
    ('anasheed admin', '${SENDGRID_EMAIL}', '123456789', 'email',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin');
`