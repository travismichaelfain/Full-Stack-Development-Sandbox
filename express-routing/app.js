import express from "express";
import calculatorRoutes from "./routes/calculator.js";
import ExpressError from "./expressError.js";

const app = express();

app.use("/", calculatorRoutes);

app.use((req, res, next) => {
  return next(new ExpressError("Not Found", 404));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;

  return res.status(status).json({
    error: err.message,
  });
});

app.listen(3000, () => {
  console.log("Server starting on port 3000");
});
