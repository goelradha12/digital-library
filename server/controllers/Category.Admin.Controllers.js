import { dbquery } from "../utils/db.helper.js";

/* =============================================
   📂 CATEGORY MANAGEMENT
============================================= */

/** Add Category */
export async function addCategory(req, res, next) {
  try {
    const { Category_Name } = req.body;

    if (!Category_Name)
      return res.status(400).json({ message: "Category name is required" });

    await dbquery(`INSERT INTO Category (Category_Name) VALUES (?)`, [
      Category_Name,
    ]);

    res.json({ message: "Category added successfully" });
  } catch (err) {
    next(err);
  }
}

/** Edit Category */
export async function editCategory(req, res, next) {
  try {
    const id = req.params.id;
    const { Category_Name } = req.body;

    await dbquery(
      `UPDATE Category SET Category_Name = ? WHERE Category_ID = ?`,
      [Category_Name, id],
    );

    res.json({ message: "Category updated successfully" });
  } catch (err) {
    next(err);
  }
}

/** Delete Category */
export async function deleteCategory(req, res, next) {
  try {
    const id = req.params.id;
    await dbquery(`DELETE FROM Category WHERE Category_ID = ?`, [id]);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
}

/** Get All Categories */
export async function getAllCategories(req, res, next) {
  try {
    const rows = await dbquery(
      `SELECT * FROM Category ORDER BY Category_Name ASC`,
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

/* =============================================
   🔗 BOOK–CATEGORY LINKING
============================================= */

/** Link Categories to a Book */
export async function linkCategoriesToBook(req, res, next) {
  try {
    const { Book_ID, Category_IDs } = req.body; // array of category IDs

    if (!Book_ID || !Array.isArray(Category_IDs)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. Provide Book_ID and Category_IDs[]" });
    }

    // Clear existing links
    await dbquery("DELETE FROM Book_To_Category WHERE Book_ID = ?", [Book_ID]);

    // Add new links
    for (const categoryId of Category_IDs) {
      await dbquery(
        `INSERT INTO Book_To_Category (Category_ID, Book_ID) VALUES (?, ?)`,
        [categoryId, Book_ID],
      );
    }

    res.json({ message: "Categories linked successfully" });
  } catch (err) {
    next(err);
  }
}

/** Get Categories of a Book */
export async function getCategoriesByBook(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await dbquery(
      `
      SELECT c.Category_ID, c.Category_Name
      FROM Category c
      JOIN Book_To_Category bc ON c.Category_ID = bc.Category_ID
      WHERE bc.Book_ID = ?
      `,
      [id],
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
}
