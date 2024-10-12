export const _getFavorite = `
    SELECT 
      a.id, a.id_user, a.id_anasheed,
      n.id AS nasheed_id, n.title, n.duration
    FROM 
      anasheedFavorite a
    JOIN
      anasheed n
    ON
      a.id_anasheed = n.id
    WHERE 
      id_user = ?;
`;

export const _addToFavorite = `
    INSERT INTO anasheedFavorite (id_user, id_anasheed) VALUES (?, ?);
`;

export const _removeFromFavorite = `
    DELETE FROM anasheedFavorite WHERE id_user = ? AND id_anasheed = ?;
`;
