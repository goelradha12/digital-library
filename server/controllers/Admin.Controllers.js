import crypto from "crypto";
import { dbquery } from "../utils/db.helper.js";

/** Hash a password using the same salt and algorithm */
function hashPassword(password) {
  return crypto
    .pbkdf2Sync(password, process.env.SALT, 1000, 64, "sha512")
    .toString("hex");
}

/** POST /admin/login */
export async function adminLogin(req, res, next) {
  try {
    const email = req.body.email?.trim();
    const { password } = req.body;

    // Check email
    const emailMatches = email === process.env.ADMIN_EMAIL;

    // Hash password and compare
    const hashed = hashPassword(password);
    const hashMatches = hashed === process.env.ADMIN_HASH;

    // Temporary debugging — does NOT log password or hash
    console.log({
      receivedEmail: email,
      expectedEmail: process.env.ADMIN_EMAIL,
      emailMatches,
      passwordProvided: Boolean(password),
      hashMatches,
    });

    if (!emailMatches || !hashMatches) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Create a signed cookie
    const token = crypto
      .createHmac("sha256", process.env.ADMIN_SECRET)
      .update("admin")
      .digest("hex");

    res.cookie("admin_session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    next(err);
  }
}

/** POST /admin/logout */
export function adminLogout(req, res) {
  res.clearCookie("admin_session");
  res.json({ message: "Logout successful" });
}

// Total Users
export const getUserCount = async (req, res) => {
  try {
    const [rows] = await dbquery("SELECT COUNT(*) AS count FROM Visitor");
    // console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching user count:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Total Subscribers
export const getSubscriberCount = async (req, res) => {
  try {
    const [rows] = await dbquery(
      "SELECT COUNT(*) AS count FROM User where subscription_end_date>= CURDATE()"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching subscriber count:", err);
    res.status(500).json({ message: "Server error" });
  }
};