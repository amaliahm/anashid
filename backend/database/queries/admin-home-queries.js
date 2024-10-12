export const _totalUsers = `
  SELECT CAST(COUNT(id) AS SIGNED) AS total_users FROM user;
`;

export const _totalAnasheed = `
  SELECT CAST(COUNT(id) AS SIGNED) AS total_anasheed FROM anasheed;
`;

export const _totalCategories = `
  SELECT CAST(COUNT(id) AS SIGNED) AS total_categories FROM category;
`;

export const _newUsers = `
  SELECT DATE_FORMAT(created_at, '%e %M') AS day, CAST(COUNT(id) AS SIGNED) AS users
  FROM user
  WHERE created_at >= CURDATE() - INTERVAL 30 DAY
  GROUP BY DATE(created_at)
  ORDER BY day;
`;

export const _popularAnasheed = `
`;

export const _popularCategories = `
`;

export const _anasheedIntoCategories = `
    SELECT c.name, CAST(COUNT(n.id) AS SIGNED) AS anasheed_count, f.file_path
    FROM category c
    LEFT JOIN anasheed n ON c.id = n.id_category
    JOIN fileAttachment f ON c.id_file = f.id
    GROUP BY c.id, c.name;
`;

export const _artists = `
    SELECT a.name, CAST(COUNT(n.id) AS SIGNED) AS anasheed_count
    FROM artist a
    LEFT JOIN anasheed n ON a.id = n.id_artist
    GROUP BY a.id, a.name;
`;

export const _activeUsers = `
    SELECT 
        SUM(CASE WHEN DATE(last_login) = CURDATE() THEN 1 ELSE 0 END) AS logged_in_today,
        SUM(CASE WHEN DATE(last_login) >= CURDATE() - INTERVAL 7 DAY 
                 AND DATE(last_login) < CURDATE() THEN 1 ELSE 0 END) AS logged_in_last_week,
        SUM(CASE WHEN DATE(last_login) >= CURDATE() - INTERVAL 30 DAY 
                 AND DATE(last_login) < CURDATE() - INTERVAL 7 DAY THEN 1 ELSE 0 END) AS logged_in_last_month,
        SUM(CASE WHEN DATE(last_login) >= CURDATE() - INTERVAL 60 DAY 
                 AND DATE(last_login) < CURDATE() - INTERVAL 30 DAY THEN 1 ELSE 0 END) AS logged_in_last_two_months
    FROM user;
`;
