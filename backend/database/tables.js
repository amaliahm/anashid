export const fileAttachmentTable = `
CREATE TABLE IF NOT EXISTS fileAttachment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    packet_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type enum('image','audio') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    size INT DEFAULT 0,
    format VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const userTable = `
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    account_name enum('email','facebook','google') DEFAULT 'email',
    account_id VARCHAR(255) UNIQUE DEFAULT NULL,
    account_type enum('user','admin') DEFAULT 'user',
    is_verified TINYINT(1) DEFAULT 0,
    is_login TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_file INT DEFAULT NULL,
    FOREIGN KEY (id_file) REFERENCES fileAttachment(id) ON DELETE CASCADE
);
`;

export const playlistTable = `
CREATE TABLE IF NOT EXISTS playlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    id_file INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_file) REFERENCES fileAttachment(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);
`;

export const categoryTable = `
CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    is_deleted TINYINT(1) DEFAULT 0,
    id_file INT DEFAULT NULL,
    FOREIGN KEY (id_file) REFERENCES fileAttachment(id) ON DELETE CASCADE
);
`;

export const artistTable = `
CREATE TABLE IF NOT EXISTS artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT DEFAULT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0,
    id_file INT DEFAULT NULL,
    FOREIGN KEY (id_file) REFERENCES fileAttachment(id) ON DELETE CASCADE
);
`;

export const languageTable = `
CREATE TABLE IF NOT EXISTS language (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);
`;

export const themeTable = `
CREATE TABLE IF NOT EXISTS theme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);
`;

export const genderTable = `
CREATE TABLE IF NOT EXISTS gender (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);
`;

export const anasheedTable = `
CREATE TABLE IF NOT EXISTS anasheed (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT DEFAULT NULL,
    duration DECIMAL(10, 3) NOT NULL,
    release_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0,
    id_image INT NOT NULL,
    id_audio INT NOT NULL,
    id_artist INT NOT NULL,
    id_language INT NOT NULL,
    id_theme INT NOT NULL,
    id_gender INT NOT NULL,
    id_category INT NOT NULL,
    FOREIGN KEY (id_image) REFERENCES fileAttachment(id) ON DELETE CASCADE,
    FOREIGN KEY (id_audio) REFERENCES fileAttachment(id) ON DELETE CASCADE,
    FOREIGN KEY (id_artist) REFERENCES artist(id) ON DELETE CASCADE,
    FOREIGN KEY (id_language) REFERENCES language(id) ON DELETE CASCADE,
    FOREIGN KEY (id_theme) REFERENCES theme(id) ON DELETE CASCADE,
    FOREIGN KEY (id_gender) REFERENCES gender(id) ON DELETE CASCADE,
    FOREIGN KEY (id_category) REFERENCES category(id) ON DELETE CASCADE
);
`;

export const listeningHistoryTable = `
CREATE TABLE IF NOT EXISTS listeningHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listening_position INT DEFAULT 0,
    duration INT DEFAULT 0,
    last_listening TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_user INT NOT NULL,
    id_anasheed INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_anasheed) REFERENCES anasheed(id) ON DELETE CASCADE
);
`;

export const anasheedPlaylistTable = `
CREATE TABLE IF NOT EXISTS anasheedPlaylist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ansheed INT NOT NULL,
    id_playlist INT NOT NULL,
    FOREIGN KEY (id_ansheed) REFERENCES anasheed(id) ON DELETE CASCADE,
    FOREIGN KEY (id_playlist) REFERENCES playlist(id) ON DELETE CASCADE
);
`;

export const anasheedFavoriteTable = `
CREATE TABLE IF NOT EXISTS anasheedFavorite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_anasheed INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_anasheed) REFERENCES anasheed(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);
`;

export const publicityTable = `
CREATE TABLE IF NOT EXISTS publicity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_file INT NOT NULL,
    FOREIGN KEY (id_file) REFERENCES fileAttachment(id) ON DELETE CASCADE
);
`;

// Triggers

export const trigger_category_fileAttachment = `
    CREATE TRIGGER IF NOT EXISTS before_delete_category
    BEFORE DELETE ON category
    FOR EACH ROW
    BEGIN
        DELETE FROM fileAttachment WHERE fileAttachment.id = OLD.id_file;
    END;
`;

export const trigger_artist_fileAttachment = `
    CREATE TRIGGER IF NOT EXISTS before_delete_artist
    BEFORE DELETE ON artist
    FOR EACH ROW
    BEGIN
        DELETE FROM fileAttachment WHERE fileAttachment.id = OLD.id_file;
    END;
`;