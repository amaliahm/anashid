export const _findCategoryById = `
    SELECT * FROM category WHERE id = ?;
`;

export const _deleteCategory = `
    UPDATE category SET is_deleted = TRUE WHERE id = ?;
`;

export const _restoreCategory = `
    UPDATE category SET is_deleted = FALSE WHERE id = ?;
`;

export const _confirmDeleteCategory = `
    DELETE FROM category WHERE id = ?;
`;

export const _trashCategory = `
    SELECT 
      c.id, c.name, c.is_deleted AS deleted_category,
      f.file_path, f.file_type, f.created_at
    FROM 
      category c
    JOIN
      fileAttachment f
    ON
     c.id_file = f.id
    WHERE 
      c.is_deleted = TRUE
    AND
      f.file_type = 'image'
    ;
`;

export const _getAllCategory = `
    SELECT 
      c.id, c.name, c.is_deleted AS deleted_category,
      f.file_path, f.file_type, f.created_at
    FROM 
      category c
    JOIN 
      fileAttachment f 
    ON 
      c.id_file = f.id 
    WHERE 
      f.file_type = 'image';
`;

export const _updateCategory = `
    UPDATE category SET name = ? WHERE id = ?;
`;

export const _addCategory = `
    INSERT INTO category (name, id_file) VALUES (?, ?);
`;

export const _addImage = `
    INSERT INTO fileAttachment (packet_name, file_name, file_type, file_path, size, format) VALUES (?, ?, ?, ?, ?, ?);
`;

export const _deleteFileAttachment = `
    DELETE FROM fileAttachment WHERE id = ?;
`;