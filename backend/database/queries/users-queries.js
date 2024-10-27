export const _getAllUsers = `
  SELECT 
    user.*,
    f.file_path, 
    f.file_type,
    COUNT(DISTINCT p.id) AS playlist,
    COUNT(DISTINCT l.id) AS listening_anasheed
  FROM 
    user 
  LEFT JOIN 
    fileAttachment f ON user.id_file = f.id AND f.file_type = 'image' 
  LEFT JOIN 
    playlist p ON p.id_user = user.id
  LEFT JOIN 
    listeningHistory l ON l.id_user = user.id
  GROUP BY 
    user.id, f.file_path, f.file_type
  ORDER BY 
    user.id;
`

export const _updateUserAcountType = `
    UPDATE user SET account_type = ? WHERE id = ?;
`