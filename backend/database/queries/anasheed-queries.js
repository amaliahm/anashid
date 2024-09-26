export const _findAnasheedById = `
    SELECT * FROM anasheed WHERE id = ?;
`;

export const _deleteAnasheed = `
    UPDATE anasheed SET is_deleted = TRUE WHERE id = ?;
`;

export const _confirmDeleteAnasheed = `
    DELETE FROM anasheed WHERE id = ?;
`;

export const _restoreAnasheed = `
    UPDATE anasheed SET is_deleted = FALSE WHERE id = ?;
`;

export const _getAllAnasheed = `
    SELECT 
      a.id, a.title, a.description, a.is_deleted AS deleted_anasheed,
      f.file_path, f.file_type, f.created_at,
      artist.name AS artist_name
    FROM 
      anasheed a
    JOIN 
      fileAttachment f 
    ON 
      a.id_image = f.id 
    JOIN
      artist
    ON
      a.id_artist = artist.id
    JOIN
      fileAttachment file
    ON
      file.id = a.id_audio
    WHERE 
    f.file_type = 'image'
    ORDER BY id;
`;


export const _addAnasheed = `
    INSERT INTO anasheed (title, description, duration, id_artist, id_language, id_theme, id_gender, id_category, id_image, id_audio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const _addFileAttachment = `
    INSERT INTO fileAttachment (packet_name, file_name, file_type, file_path, size, format) VALUES (?, ?, ?, ?, ?, ?);
`;

export const _deleteFileAttachment = `
    DELETE FROM fileAttachment WHERE id = ?;
`;

export const _trashAnasheed = `
    SELECT 
      a.id, a.title AS name, a.description, a.is_deleted AS deleted_anasheed,
      f.file_path, f.file_type, f.created_at,
      artist.name AS artist_name
    FROM 
      anasheed a
    JOIN 
      fileAttachment f 
    ON 
      a.id_image = f.id 
    JOIN
      artist
    ON
      a.id_artist = artist.id
    JOIN
      fileAttachment file
    ON
      file.id = a.id_audio
    WHERE 
      f.file_type = 'image'
    AND 
      a.is_deleted = TRUE;
`;