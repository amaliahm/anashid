export const listeningHistoryTable = `
CREATE TABLE IF NOT EXISTS listeningHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    duration INT DEFAULT 0,
    listening_position INT DEFAULT 0,
    last_listening TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;