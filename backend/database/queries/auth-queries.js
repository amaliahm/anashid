/**
 * insert a new user record into the database with the provided email, username, and password.
 *
 * @param {string} username - username for the new user.
 * @param {string} email - email address for the new user.
 * @param {string} password - password for the new user.
*/

export const register_with_email = `
    INSERT INTO user (username, email, password, account_name, created_at, last_login)
        VALUES (?, ?, ?, 'email', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;

/**
 * update the login status and last login timestamp for a user.
 *
 * @param {number} id - id of the user to update.
*/

export const userLogin = `
    UPDATE user SET is_login = TRUE, last_login = CURRENT_TIMESTAMP WHERE id = ?;
`;

/**
 * updates the password for a user with the given email address.
 *
 * @param {string} password - the new password for the user.
 * @param {string} email - the email address of the user whose password should be updated.
*/

export const updateUserPassword = `
    UPDATE user SET password = ? WHERE email = ?;
`
/**
 * finds user record by their email address.
 *
 * @param {string} email - the email address to search for.
*/

export const _findUserByEmail = `
    SELECT * FROM user WHERE email = ?;
`

/**
 * finds user record by his id.
 *
 * @param {number} id - id of the user to find.
*/

export const _findUserById = `
    SELECT * FROM user WHERE id = ?;
`

/**
 * update the email verification status for a user.
 *
 * @param {number} id - user id whose email should be marked as verified.
*/

export const _verifyUserEmail = `
    UPDATE user SET is_verified = TRUE WHERE id = ?;
`

/**
 * updates the login status of a user to false.
 *
 * @param {number} id - user id to logout.
*/

export const _userLogout = `
    UPDATE user SET is_login = FALSE WHERE id = ?;
`;