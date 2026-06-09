/** Express app for bookstore. */

import express from "express";
import ExpressError from "./expressError.js";
import bookRoutes from "./routes/books.js";

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);

/** 404 handler */
app.use((req, res, next) => {
  return next(new ExpressError("Not Found", 404));
});

/** General error handler */
app.use((err, req, res, next) => {
  const status = err.status || 500;

  return res.status(status).json({
    error: err,
    message: err.message,
  });
});

export default app;
