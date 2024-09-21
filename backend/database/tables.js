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
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const anasheedTable = `
CREATE TABLE IF NOT EXISTS anasheed (
    nasheed_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT DEFAULT NULL,
    duration INT NOT NULL,
    release_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_nasheed TINYINT(1) DEFAULT 0
);
`;

export const categoryTable = `
CREATE TABLE IF NOT EXISTS category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    deleted_category TINYINT(1) DEFAULT 0
);
`;

export const fileAttachmentTable = `
CREATE TABLE IF NOT EXISTS fileAttachment (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    packet_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type enum('image','audio') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    size INT DEFAULT 0,
    format VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_file_id INT,
    FOREIGN KEY (category_file_id) REFERENCES category(category_id) ON DELETE CASCADE
);
`;

export const artistTable = `
CREATE TABLE IF NOT EXISTS artist (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT DEFAULT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_artist TINYINT(1) DEFAULT 0
);
`;