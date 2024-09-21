export const _findCategoryById = `
    SELECT * FROM category WHERE id = ?;
`;

export const _deleteCategory = `
    UPDATE category SET is_deleted = TRUE WHERE id = ?;
`;

export const _getAllCategory = `
    SELECT * FROM category ORDER BY id;
`;

export const _updateCategory = `
    UPDATE category SET name = ? WHERE id = ?;
`;