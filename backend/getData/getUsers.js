import { pool } from "../dbConnection/dbConnection.js";

async function getUsers() {
    let conn;
    try {
        console.log('11')
        conn = await pool.getConnection();
        console.log('22')
        console.log(conn)
        const [users] = await conn.query('SELECT * FROM user;');
        console.log('11')
        console.log(users)

        return users;
    } catch (err) {
        console.log('44')
        console.log(err)

        throw new Error('Failed to fetch users');
    } finally {
        if (conn) conn.release();
    }
}

export default getUsers;
