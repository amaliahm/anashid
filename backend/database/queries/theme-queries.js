export const _deleteTheme = `
    DELETE FROM theme WHERE id = ?;
`;

export const _insertTheme = `
    INSERT INTO theme (value) VALUES (?);
`;

export const _getTheme = `
    SELECT * FROM theme;
`;

export const _findThemeById = `
    SELECT * FROM theme WHERE id = ?;
`

