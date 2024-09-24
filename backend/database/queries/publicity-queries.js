export const _deletePublicity = `
    DELETE FROM publicity WHERE id = ?;
`;

export const _insertPublicity = `
    INSERT INTO publicity (id_file) VALUES (?);
`;

export const _getPublicity = `
    SELECT 
      p.id,
      f.file_path, f.file_type, f.created_at
    FROM 
      publicity p
    JOIN
      fileAttachment f
    ON
      p.id_file = f.id
    WHERE 
      f.file_type = 'image';
`;

export const _addImage = `
    INSERT INTO fileAttachment (packet_name, file_name, file_type, file_path, size, format) VALUES (?, ?, ?, ?, ?, ?);
`;

export const _deleteFileAttachment = `
    DELETE FROM fileAttachment WHERE id = ?;
`;

export const _findPublicityById = `
    SELECT * FROM publicity WHERE id = ?;
`

