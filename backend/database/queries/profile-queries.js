export const _addImage = `
    INSERT INTO fileAttachment (packet_name, file_name, file_type, file_path, size, format) VALUES (?, ?, ?, ?, ?, ?);
`;

export const _updateImage = `
    UPDATE fileAttachment SET packet_name = ?, file_name = ?, file_type = ?, file_path = ?, size = ?, format = ? WHERE id = ?;
`

export const _updateUser = `
    UPDATE user SET id_file = ? WHERE id = ?;
`

export const _getUserById = `
    SELECT 
      u.id, u.username, u.email, u.id_file,
      f.file_path, f.file_type, f.created_at
    FROM 
      user u
    LEFT JOIN
      fileAttachment f
    ON
      u.id_file = f.id
    WHERE 
      u.id = ?
    AND
      (f.file_type = 'image' OR f.file_type IS NULL);
`