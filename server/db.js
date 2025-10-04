import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
  charset: "utf8mb4",
  decimalNumbers: true,
});

pool
  .getConnection()
  .then((conn) => {
    const res = conn.query("SELECT 1;");
    conn.release();
    return res;
  })
  .then((results) => {
    console.log("Connected to MySQL DB");
  })
  .catch((err) => {
    console.log(err);
  });

export default pool;
