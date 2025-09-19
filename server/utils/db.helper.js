// db.helper.js
import pool from "../db.js";

/**
 * Run a query with automatic connection handling
 * @param {string} sql - The SQL query
 * @param {Array} params - Parameters for the query
 * @returns {Promise<Array>} Result rows
 */
export async function dbquery(sql, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(sql, params);
    return rows;
  } catch (err) {
    console.error("DB Error:", err);
    throw err; // let controller handle the error
  } finally {
    if (conn) conn.release();
  }
}
