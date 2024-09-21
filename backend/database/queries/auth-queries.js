export const register_with_email = `
    INSERT INTO user (username, email, password, account_name, created_at, last_login)
        VALUES (?, ?, ?, 'email', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;

export const userLogin = `
    UPDATE user SET is_login = TRUE, last_login = CURRENT_TIMESTAMP WHERE id = ?;
`;

export const updateUserPassword = `
    UPDATE user SET password = ? WHERE email = ?;
`

export const _findUserByEmail = `
    SELECT * FROM user WHERE email = ?;
`

export const _findUserById = `
    SELECT * FROM user WHERE id = ?;
`

export const _verifyUserEmail = `
    UPDATE user SET is_verified = TRUE WHERE id = ?;
`

export const _userLogout = `
    UPDATE user SET is_login = FALSE WHERE id = ?;
`;