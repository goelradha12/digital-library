import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
import bookRouter from "./routers/Book.Routers.js";
import authorRouter from "./routers/Author.Routers.js";

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
