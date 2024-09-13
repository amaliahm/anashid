import { userTable } from "./userTable.js";
import { pool } from "../dbConnection/dbConnection.js";

async function createTables() {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(userTable);
        console.log('tables created!');
    } catch (err) {
        console.error('error creating tables:', err);
    } finally {
        if (conn) conn.end();
    }
}

export default createTables;
