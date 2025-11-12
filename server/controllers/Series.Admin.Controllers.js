import { dbquery } from "../utils/db.helper.js";

/** Add new series */
export async function addSeries(req, res, next) {
  try {
    const { Series_Name, Series_Description } = req.body;

    await dbquery(
      `INSERT INTO Series (Series_Name, Series_Description)
       VALUES (?, ?)`,
      [Series_Name, Series_Description || null]
    );

    res.json({ message: "Series added successfully" });
  } catch (err) {
    next(err);
  }
}

/** Edit series */
export async function editSeries(req, res, next) {
  try {
    const id = req.params.id;
    const { Series_Name, Series_Description } = req.body;

    await dbquery(
      `UPDATE Series
       SET Series_Name = ?, Series_Description = ?
       WHERE Series_ID = ?`,
      [Series_Name, Series_Description || null, id]
    );

    res.json({ message: "Series updated successfully" });
  } catch (err) {
    next(err);
  }
}

/** Delete series */
export async function deleteSeries(req, res, next) {
  try {
    const id = req.params.id;
    await dbquery(`DELETE FROM Series WHERE Series_ID = ?`, [id]);
    res.json({ message: "Series deleted successfully" });
  } catch (err) {
    next(err);
  }
}

/** Get all series */
export async function getAllSeries(req, res, next) {
  try {
    const rows = await dbquery(`SELECT * FROM Series ORDER BY Series_Name ASC`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
