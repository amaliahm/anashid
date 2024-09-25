export const _deleteLanguage = `
    DELETE FROM language WHERE id = ?;
`;

export const _insertLanguage = `
    INSERT INTO language (value) VALUES (?);
`;

export const _getLanguage = `
    SELECT * FROM language;
`;

export const _findLanguageById = `
    SELECT * FROM language WHERE id = ?;
`

