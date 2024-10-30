export const _getFavorite = `
  SELECT 
    a.id, a.title AS nasheed_title, a.description, a.is_deleted AS deleted_anasheed, a.duration,
    f.file_path, f.file_type, f.created_at,
    artist.name AS artist_name,
    file.file_path AS audio_path,
    1 AS is_favorite
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
  INNER JOIN 
      anasheedFavorite af
  ON 
      a.id = af.id_anasheed AND af.id_user = ?
  WHERE 
      f.file_type = 'image'
  ORDER BY 
      a.id;
`;

export const _addToFavorite = `
    INSERT INTO anasheedFavorite (id_user, id_anasheed) VALUES (?, ?);
`;

export const _removeFromFavorite = `
    DELETE FROM anasheedFavorite WHERE id_user = ? AND id_anasheed = ?;
`;
