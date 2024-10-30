export const _getListeningNasheed = `
    SELECT 
      lh.id AS listening_id, lh.listening_position, lh.last_listening,
      a.id, a.title AS nasheed_title, a.description, a.duration,
      f.file_path, f.file_type, f.created_at,
      artist.name AS artist_name,
      artist_file.file_path AS artist_image,
      category_file.file_path AS category_image,
      file.file_path AS audio_path,
      (SELECT value FROM gender WHERE id = a.id_gender) AS gender_value,
      (SELECT value FROM language WHERE id = a.id_language) AS language_value,
      (SELECT value FROM theme WHERE id = a.id_theme) AS theme_value,
      (SELECT name file FROM category WHERE id = a.id_category) AS category_name
    FROM
      listeningHistory lh
    JOIN
      anasheed a
    ON
      lh.id_anasheed = a.id
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
    JOIN
      fileAttachment artist_file
    ON
      artist_file.id = artist.id_file
    JOIN 
      fileAttachment category_file
    ON
      category_file.id = a.id_image
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
    AND 
      EXISTS (
        SELECT 1 FROM category WHERE id = a.id_category
      )
    AND
      lh.id_user = ?
    ORDER BY 
      lh.last_listening DESC
    LIMIT
      1;
`;

export const _getAllListeningNasheed = `
  SELECT 
    DATE(lh.last_listening) AS listening_date,
    lh.id AS listening_id, lh.listening_position, lh.last_listening,
    a.id, a.title AS nasheed_title, a.description, a.duration, a.release_date,
    f.file_path, f.file_type, f.created_at,
    artist.name AS artist_name
  FROM
    listeningHistory lh
  JOIN
    anasheed a ON lh.id_anasheed = a.id
  JOIN
    fileAttachment f ON a.id_image = f.id
  JOIN
    artist ON a.id_artist = artist.id
  WHERE 
    f.file_type = 'image'
  AND
    lh.id_user = 1
  GROUP BY 
    listening_date, lh.id, a.id 
  ORDER BY 
    listening_date DESC, lh.last_listening DESC;
`;

export const _addListening = `
    INSERT INTO 
      listeningHistory 
      (id_user, id_anasheed, listening_position, last_listening)
    VALUES 
      (?, ?, ?, CURRENT_TIMESTAMP)
    ON DUPLICATE KEY UPDATE
      last_listening = CURRENT_TIMESTAMP,
      listening_position = VALUES(listening_position),
      duration = duration + VALUES(listening_position);
`

export const _getFavorite = `
  SELECT id, id_anasheed FROM anasheedFavorite WHERE id_user = ?;
`