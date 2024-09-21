
import mariadb from "mariadb";

// CONFIG
import { DATABASE } from "../configs/config.js";

// CREATE TABLES
import { userTable } from "./tables.js";

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
    await this.connection.query(userTable);
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
}
