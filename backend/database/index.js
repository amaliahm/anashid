
import mariadb from "mariadb";

// CONFIG
import { DATABASE } from "../configs/config.js";

// CREATE TABLES
import { 
  fileAttachmentTable,
  userTable,
  playlistTable,
  categoryTable,
  artistTable,
  languageTable,
  themeTable,
  genderTable,
  anasheedTable,
  listeningHistoryTable,
  anasheedPlaylistTable,
  anasheedFavoriteTable,
  trigger_category_fileAttachment,
  trigger_artist_fileAttachment,
  publicityTable
} from "./tables.js";

export default class DataBaseRepo {
  static connection;

  static async setupDatabase(callback) {
    try {
      this.connection = await mariadb.createConnection({
        host: DATABASE.host,
        user: DATABASE.user,
        password: DATABASE.password,
        database: DATABASE.database,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
      });
      await this.createTables();
      callback();
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }

  static async createTables() {
    // tables
    await this.connection.query(fileAttachmentTable);
    await this.connection.query(userTable);
    await this.connection.query(playlistTable);
    await this.connection.query(categoryTable);
    await this.connection.query(artistTable);
    await this.connection.query(languageTable);
    await this.connection.query(themeTable);
    await this.connection.query(genderTable);
    await this.connection.query(anasheedTable);
    await this.connection.query(listeningHistoryTable);
    await this.connection.query(anasheedPlaylistTable);
    await this.connection.query(anasheedFavoriteTable);
    await this.connection.query(publicityTable);

    // triggers
    await this.connection.query(trigger_category_fileAttachment);
    await this.connection.query(trigger_artist_fileAttachment);
  }

  static async queryDatabase(query, options) {
    try {
      const rows = await this.connection.query(query, options);
      return (rows === null || rows.length > 0) ? rows : null;
    } catch (error) {
      console.error("Error querying the database:", error);
      throw error;
    }
  }

  static async getInsertedId(query, options) {
    try {
      const rows = await this.connection.execute(query, options);
      if (rows === null || rows.length > 0) return null;
      const newId = rows.insertId;
      return {id: newId}
    } catch (error) {
      console.error("Error querying the database:", error);
      throw error;
    }
  }
}
