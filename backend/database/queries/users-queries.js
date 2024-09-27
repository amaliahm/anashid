export const _getAllUsers = `
    SELECT 
      user.*,
      f.file_path, f.file_type
    FROM 
      user 
    LEFT JOIN 
      fileAttachment f 
    ON 
      user.id_file = f.id 
    AND 
      f.file_type = 'image'
    ORDER BY 
      user.id;
`

export const _updateUserAcountType = `
    UPDATE user SET account_type = ? WHERE id = ?;
`