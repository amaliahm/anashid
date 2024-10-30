export const _findArtistById = `
    SELECT * FROM artist WHERE id = ?;
`;

export const _deleteArtist = `
    UPDATE artist SET is_deleted = TRUE WHERE id = ?;
`;

export const _confirmDeleteArtist = `
    DELETE FROM artist WHERE id = ?;
`;

export const _restoreArtist = `
    UPDATE artist SET is_deleted = FALSE WHERE id = ?;
`;

export const _trashArtist = `
    SELECT 
      a.id, a.name AS artist_name, a.bio, a.is_deleted AS deleted_artist,
      f.file_path, f.file_type, f.created_at
    FROM 
      artist a
    JOIN
      fileAttachment f
    ON
      a.id_file = f.id
    WHERE 
      is_deleted = TRUE
    AND
      f.file_type = 'image';
`;

export const _getAllArtist = `
    SELECT 
      a.id, a.name AS artist_name, a.is_deleted AS deleted_artist, a.bio,
      f.file_path, f.file_type, f.created_at,
      COUNT(DISTINCT n.id) AS anasheed
    FROM 
      artist a
    JOIN 
      fileAttachment f 
    ON 
      a.id_file = f.id 
    LEFT JOIN
      anasheed n
    ON 
      a.id = n.id_artist
    WHERE 
      f.file_type = 'image'
    GROUP BY
      a.id;
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

export const _deleteFileAttachment = `
    DELETE FROM fileAttachment WHERE id = ?;
`;