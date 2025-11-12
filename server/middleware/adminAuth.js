import crypto from "crypto";

/**
 * Verify admin session cookie.
 * Checks if a signed token exists and matches stored hash.
 */
export function verifyAdmin(req, res, next) {
  try {
    const { admin_session } = req.cookies;
    if (!admin_session)
      return res.status(401).json({ message: "Not authenticated" });

    const expected = crypto
      .createHmac("sha256", process.env.ADMIN_SECRET)
      .update("admin")
      .digest("hex");

    if (admin_session !== expected)
      return res.status(403).json({ message: "Invalid session" });

    next();
  } catch (err) {
    next(err);
  }
}
