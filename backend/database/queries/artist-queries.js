export const _findArtistById = `
    SELECT * FROM artist WHERE id = ?;
`;

export const _deleteArtist = `
    UPDATE artist SET is_deleted = TRUE WHERE id = ?;
`;

export const _getAllArtist = `
    SELECT * FROM artist ORDER BY id;
`;

export const _updateArtist = `
    UPDATE artist SET name = ?, bio = ? WHERE id = ?;
`;