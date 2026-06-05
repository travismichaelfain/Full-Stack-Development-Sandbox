import express from "express";
import storeRoutes from "./routes/storeRoutes.js";
import ExpressError from "./ExpressError.js";

const app = express();

app.use(express.json());

app.use("/store", storeRoutes);

app.use((req, res, next) => {
  return next(new ExpressError("Not Found", 404));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;

  return res.status(status).json({
    error: err.message,
  });
});

export default app;
