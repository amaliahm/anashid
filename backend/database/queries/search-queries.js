export const _searchQuery = `
  SELECT 
    a.id, a.title AS nasheed_title,
    artist.name AS artist_name,
    file.file_path
  FROM anasheed a
  LEFT JOIN artist ON a.id_artist = artist.id
  LEFT JOIN fileAttachment file ON a.id_image = file.id
  WHERE nasheed_title LIKE CONCAT('%', ?, '%')
  ORDER BY nasheed_title ASC;
`

export const _filterQuery = `
  SELECT 
    a.id, a.title AS nasheed_title,
    artist.name AS artist_name,
    file.file_path
  FROM anasheed a
  LEFT JOIN artist ON a.id_artist = artist.id
  LEFT JOIN fileAttachment file ON a.id_image = file.id
  WHERE 
    (? IS NULL OR a.id_gender = ?)
    AND (? IS NULL OR a.id_theme = ?)
    AND (? IS NULL OR a.id_language = ?)
  ORDER BY nasheed_title ASC;
`