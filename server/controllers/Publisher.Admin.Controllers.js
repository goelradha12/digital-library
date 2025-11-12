import { dbquery } from "../utils/db.helper.js";

/** Add new publisher */
export async function addPublisher(req, res, next) {
  try {
    const { Publisher_Name } = req.body;
    await dbquery(
      `INSERT INTO Publisher (Publisher_Name)
       VALUES (?)`,
      [Publisher_Name]
    );

    res.json({ message: "Publisher added successfully" });
  } catch (err) {
    next(err);
  }
}

/** Edit publisher */
export async function editPublisher(req, res, next) {
  try {
    const id = req.params.id;
    const { Publisher_Name } = req.body;

    await dbquery(
      `UPDATE Publisher
       SET Publisher_Name = ?
       WHERE Publisher_ID = ?`,
      [Publisher_Name, id]
    );

    res.json({ message: "Publisher updated successfully" });
  } catch (err) {
    next(err);
  }
}

/** Delete publisher */
export async function deletePublisher(req, res, next) {
  try {
    const id = req.params.id;
    await dbquery(`DELETE FROM Publisher WHERE Publisher_ID = ?`, [id]);
    res.json({ message: "Publisher deleted successfully" });
  } catch (err) {
    next(err);
  }
}

/** Get all publishers */
export async function getAllPublishers(req, res, next) {
  try {
    const rows = await dbquery(
      `SELECT * FROM Publisher ORDER BY Publisher_Name ASC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
