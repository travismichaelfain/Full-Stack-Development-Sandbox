import {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem,
} from "../actions/storeActions.js";

import express from "express";

const router = express.Router();

router.get("/", getItems);
router.get("/:name", getItem);
router.post("/", addItem);
router.patch("/:name", updateItem);
router.delete("/:name", deleteItem);

export default router;
