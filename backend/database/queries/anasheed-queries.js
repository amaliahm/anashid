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
      a.id, a.title, a.description, a.is_deleted AS deleted_anasheed, a.duration,
      f.file_path, f.file_type, f.created_at,
      artist.name AS artist_name,
      file.file_path AS audio_path,
      (SELECT value FROM gender WHERE id = a.id_gender) AS gender_value,
      (SELECT value FROM language WHERE id = a.id_language) AS language_value,
      (SELECT value FROM theme WHERE id = a.id_theme) AS theme_value
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
      EXISTS (
        SELECT 1 FROM gender WHERE id = a.id_gender
      )
    AND 
      EXISTS (
        SELECT 1 FROM language WHERE id = a.id_language
      )
    AND 
      EXISTS (
        SELECT 1 FROM theme WHERE id = a.id_theme
      )
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