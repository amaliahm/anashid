export const _findPlaylistById = `
    SELECT * FROM playlist WHERE id = ?;
`;

export const _deletePlaylist = `
    DELETE FROM playlist WHERE id = ?;
`;

export const _getPlaylist = `
    SELECT 
        p.id, p.name,
        f.file_path, f.file_type, f.created_at,
        COUNT(pa.id) AS anasheed_count
    FROM
        playlist p
    JOIN
        fileAttachment f
    ON
        p.id_file = f.id 
    LEFT JOIN 
        anasheedPlaylist pa 
    ON
        pa.id_playlist = p.id 
    WHERE
        f.file_type = 'image' 
    AND
        p.id_user = ?
    GROUP BY 
        p.id, p.name, f.file_path, f.file_type, f.created_at;
`;

export const _addPlaylist = `
    INSERT INTO playlist (name, id_file, id_user) VALUES (?, ?, ?);
`;

export const _addImage = `
    INSERT INTO fileAttachment (packet_name, file_name, file_type, file_path, size, format) VALUES (?, ?, ?, ?, ?, ?);
`;

export const _deleteFileAttachment = `
    DELETE FROM fileAttachment WHERE id = ?;
`;

export const _addToPlaylist = `
    INSERT INTO anasheedPlaylist (id_anasheed, id_playlist) VALUES (?,?);
`

export const _getAnasheedFromPlaylist = `
    SELECT * FROM anasheedPlaylist WHERE id_anasheed = ? AND id_playlist = ?;
`

export const _removeFromPlaylist = `
    DELETE FROM anasheedPlaylist WHERE id = ?;
`