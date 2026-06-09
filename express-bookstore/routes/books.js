import express from "express";
import Book from "../models/book.js";
import ExpressError from "../expressError.js";

import { validate } from "jsonschema";

import bookNewSchema from "../schemas/bookNew.json" with { type: "json" };
import bookUpdateSchema from "../schemas/bookUpdate.json" with { type: "json" };

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.findAll(req.query);

  return res.json({ books });
});

router.get("/:id", async (req, res) => {
  const book = await Book.findOne(req.params.id);

  return res.json({ book });
});

router.post("/", async (req, res) => {
  const result = validate(req.body, bookNewSchema);

  if (!result.valid) {
    const errors = result.errors.map((e) => e.stack);
    throw new ExpressError(errors, 400);
  }

  const book = await Book.create(req.body);

  return res.status(201).json({ book });
});

router.put("/:isbn", async (req, res) => {
  const result = validate(req.body, bookUpdateSchema);

  if (!result.valid) {
    const errors = result.errors.map((e) => e.stack);
    throw new ExpressError(errors, 400);
  }

  const book = await Book.update(req.params.isbn, req.body);

  return res.json({ book });
});

router.delete("/:isbn", async (req, res) => {
  await Book.remove(req.params.isbn);

  return res.json({
    message: "Book deleted",
  });
});

export default router;
