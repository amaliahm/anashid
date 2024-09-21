export const _findCategoryById = `
    SELECT * FROM category WHERE id = ?;
`;

export const _deleteCategory = `
    UPDATE category SET is_deleted = TRUE WHERE id = ?;
`;

export const _getAllCategory = `
    SELECT * FROM 
    category c
    JOIN 
    fileAttachment f 
    ON 
    c.category_id = f.category_file_id 
    WHERE 
    f.file_type = 'image';
`;

export const _updateCategory = `
    UPDATE category SET name = ? WHERE id = ?;
`;

export const _addCategory = `
    INSERT INTO category (name) VALUES (?);
`;

export const _addImage = `
    INSERT INTO fileAttachment (packet_name, file_name, file_type, file_path, size, format, category_file_id) VALUES (?, ?, ?, ?, ?, ?, ?);
`;