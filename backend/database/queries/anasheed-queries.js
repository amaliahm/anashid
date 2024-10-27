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
    (SELECT value FROM theme WHERE id = a.id_theme) AS theme_value,
    (SELECT name FROM category WHERE id = a.id_category) AS category_name,
    COUNT(DISTINCT l.id) AS listening_anasheed,
    COUNT(DISTINCT af.id) AS favorite_anasheed
  FROM 
    anasheed a
  JOIN 
    fileAttachment f ON a.id_image = f.id 
  JOIN 
    artist ON a.id_artist = artist.id
  JOIN 
    fileAttachment file ON file.id = a.id_audio
  LEFT JOIN 
    listeningHistory l ON l.id_anasheed = a.id
  LEFT JOIN 
    anasheedFavorite af ON af.id_anasheed = a.id
  WHERE 
    f.file_type = 'image'
    AND EXISTS (SELECT 1 FROM gender WHERE id = a.id_gender)
    AND EXISTS (SELECT 1 FROM language WHERE id = a.id_language)
    AND EXISTS (SELECT 1 FROM theme WHERE id = a.id_theme)
    AND EXISTS (SELECT 1 FROM category WHERE id = a.id_category)
  GROUP BY 
    a.id, f.file_path, f.file_type, artist.name, file.file_path
  ORDER BY 
    a.id;
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

export const _updateAnasheed = `
    UPDATE anasheed SET title = ?, description = ? WHERE id = ?;
`;

export const _getCategoryAnasheed = `
  SELECT 
      a.id, a.title, a.description, a.is_deleted AS deleted_anasheed, a.duration,
      f.file_path, f.file_type, f.created_at,
      artist.name AS artist_name,
      file.file_path AS audio_path,
      (SELECT value FROM gender WHERE id = a.id_gender) AS gender_value,
      (SELECT value FROM language WHERE id = a.id_language) AS language_value,
      (SELECT value FROM theme WHERE id = a.id_theme) AS theme_value,
      (SELECT name FROM category WHERE id = a.id_category) AS category_name
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
      a.id_category = ?
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
    AND 
      EXISTS (
        SELECT 1 FROM category WHERE id = a.id_category
      )
    ORDER BY id;
`;

export const _getArtistAnasheed = `
  SELECT 
      a.id, a.title, a.description, a.is_deleted AS deleted_anasheed, a.duration,
      f.file_path, f.file_type, f.created_at,
      artist.name AS artist_name,
      file.file_path AS audio_path,
      (SELECT value FROM gender WHERE id = a.id_gender) AS gender_value,
      (SELECT value FROM language WHERE id = a.id_language) AS language_value,
      (SELECT value FROM theme WHERE id = a.id_theme) AS theme_value,
      (SELECT name FROM category WHERE id = a.id_category) AS category_name
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
      a.id_artist = ?
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
    AND 
      EXISTS (
        SELECT 1 FROM category WHERE id = a.id_category
      )
    ORDER BY id;
`;

export const _getFavorite = `
  SELECT id, id_anasheed FROM anasheedFavorite WHERE id_user = ?;
`

export const _getPlaylistAnasheed = `
  SELECT 
    p.id AS id_playlist, p.name,
    a.id, a.title, a.description, a.is_deleted AS deleted_anasheed, a.duration,
    f.file_path, f.file_type, f.created_at,
    file.file_path AS audio_path,
    ap.id as anasheed_playlist_id
  FROM 
    playlist p
  LEFT JOIN
    anasheedPlaylist ap 
  ON
    p.id = ap.id_playlist
  JOIN
    anasheed a
  ON
    ap.id_anasheed = a.id
  JOIN
    fileAttachment f 
  ON 
    a.id_image = f.id
  JOIN
    fileAttachment file
  ON
    file.id = a.id_audio
  WHERE 
    f.file_type = 'image'
  AND
    file.file_type = 'audio'
  AND
    p.id_user = ?
  AND
    p.id = ?
  ORDER BY a.id;
`