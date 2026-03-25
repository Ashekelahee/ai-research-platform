import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const tables = ['embeddings', 'collaborationRequests', 'equipment', 'researchers', 'labs', 'users'];

for (const table of tables) {
  try {
    await connection.execute(`DROP TABLE IF EXISTS \`${table}\``);
    console.log(`✓ Dropped ${table}`);
  } catch (err) {
    console.error(`✗ Failed to drop ${table}:`, err.message);
  }
}

await connection.end();
console.log('Database reset complete');
