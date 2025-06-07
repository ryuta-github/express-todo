// db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "myapp",
  password: "password", // ここに実際のパスワードを入力
  port: 5432, // PostgreSQLのデフォルトポート
});

export default pool;
