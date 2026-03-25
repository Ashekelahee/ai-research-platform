import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await connection.execute('SHOW TABLES');
console.log('Tables in database:', rows.map(r => Object.values(r)[0]));
await connection.end();
