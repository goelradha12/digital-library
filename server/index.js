import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "https://dlmsfrontend.netlify.app",
    credentials: true,
    exposedHeaders: ["X-Total-Pages"],
  }),
);
app.use(cookieParser());
import bookRouter from "./routers/Book.Routers.js";
import authorRouter from "./routers/Author.Routers.js";
import authUserRouter from "./routers/User.Routers.js";
import publisherRouter from "./routers/Publisher.Routes.js";
import paymentRouter from "./routers/Payment.Routes.js";
import pdfViewerRouter from "./routers/PDFVierwer.Routers.js";
import leaderboardRouter from "./routers/LeaderBoard.Routers.js";
import adminRouter from "./routers/Admin.Routers.js";
import { apiError } from "./utils/api.error.js";

app.use(express.json());
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening at port: " + port);
});

app.get("/", async (req, res) => {
  // Do something with the connection
  res.send("I am here");
});

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/users", authUserRouter);
app.use("/publishers", publisherRouter);
app.use("/payments", paymentRouter);
app.use("/pdf", pdfViewerRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/admin", adminRouter);

// Centralized error middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  if (err instanceof apiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // fallback for unhandled errors
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
});
