export const _findArtistById = `
    SELECT * FROM artist WHERE id = ?;
`;

export const _deleteArtist = `
    UPDATE artist SET is_deleted = TRUE WHERE id = ?;
`;

export const _getAllArtist = `
    SELECT 
      a.id, a.name, a.is_deleted AS deleted_artist, a.bio,
      f.file_path, f.file_type, f.created_at
    FROM 
    artist a
    JOIN 
    fileAttachment f 
    ON 
    a.id_file = f.id 
    WHERE 
    f.file_type = 'image';
`;

export const _updateArtist = `
    UPDATE artist SET name = ?, bio = ? WHERE id = ?;
`;

export const _addArtist = `
    INSERT INTO artist (name, bio, id_file) VALUES (?, ?, ?);
`;

export const _addImage = `
    INSERT INTO fileAttachment (packet_name, file_name, file_type, file_path, size, format) VALUES (?, ?, ?, ?, ?, ?);
`;