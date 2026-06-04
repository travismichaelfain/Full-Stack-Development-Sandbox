import express from "express";
import ExpressError from "../expressError.js";

import {
  convertAndValidateNumsArray,
  findMean,
  findMedian,
  findMode,
} from "../helpers.js";

const router = express.Router();

const getNumsFromQuery = (req) => {
  const { nums } = req.query;

  if (!nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400,
    );
  }

  return convertAndValidateNumsArray(nums.split(","));
};

router.get("/mean", (req, res) => {
  const nums = getNumsFromQuery(req);

  return res.json({
    operation: "mean",
    result: findMean(nums),
  });
});

router.get("/median", (req, res) => {
  const nums = getNumsFromQuery(req);

  return res.json({
    operation: "median",
    result: findMedian(nums),
  });
});

router.get("/mode", (req, res) => {
  const nums = getNumsFromQuery(req);

  return res.json({
    operation: "mode",
    result: findMode(nums),
  });
});

export default router;
