export const register_with_email = `
    INSERT INTO user (username, email, password, account_name, created_at, last_login)
        VALUES (?, ?, ?, 'email', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;

export const userLogin = `
    UPDATE user SET is_login = FALSE, last_login = CURRENT_TIMESTAMP WHERE id = ?;
`;
