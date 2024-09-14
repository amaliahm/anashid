export const userLogin = `
    UPDATE user SET is_login = TRUE, last_login = CURRENT_TIMESTAMP WHERE id = ?;
`;
