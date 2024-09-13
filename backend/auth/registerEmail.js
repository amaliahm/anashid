export const register_with_email = `
    INSERT INTO user (username, email, password, account_name, created_at, last_login)
        VALUES (?, ?, ?, 'email', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;
