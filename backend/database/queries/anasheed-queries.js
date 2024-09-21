export const _findAnasheedById = `
    SELECT * FROM anasheed WHERE id = ?;
`;

export const _deleteAnasheed = `
    UPDATE anasheed SET is_deleted = TRUE WHERE id = ?;
`;

export const _getAllAnasheed = `
    SELECT * FROM anasheed ORDER BY id;
`;

export const _updateAnasheed = `
    UPDATE anasheed SET title = ?, description = ? WHERE id = ?;
`;