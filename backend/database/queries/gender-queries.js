export const _deleteGender = `
    DELETE FROM gender WHERE id = ?;
`;

export const _insertGender = `
    INSERT INTO gender (value) VALUES (?);
`;

export const _getGender = `
    SELECT * FROM gender;
`;

export const _findGenderById = `
    SELECT * FROM gender WHERE id = ?;
`

