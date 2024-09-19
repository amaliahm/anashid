export const _getAllUsers = `
    SELECT * FROM user ORDER BY id;
`

export const _updateUserAcountType = `
    UPDATE user SET account_type = ? WHERE id = ?;
`