import mariadb from "mariadb";
import { DATABASE } from "../configs/config.js";
import { userTable } from "./tables.js";

export default class DataBaseRepo {
  static connection;

  static async setupDatabase(callback) {
    try {
      this.connection = await mariadb.createConnection({
        host: DATABASE.HOST,
        user: DATABASE.USER,
        password: DATABASE.PASSWORD,
        database: DATABASE.NAME,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
      });
      await this.createTables();
      callback();
      console.log("Database connected Successfully");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }

  static async createTables() {
    await this.connection.query(userTable);
    //   this.connection.query(userTable);
    console.log("Data Base tables created");
  }

  static async queryDatabase(query, options) {
    try {
      // validate query
      const [rows] = this.connection.query(query, options);
      if (object.keys(rows).length > 0) return rows;

      return null;
    } catch (error) {
      console.error("Error querying the database:", error);
      throw error;
    }
  }
}
