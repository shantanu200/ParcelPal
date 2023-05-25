import express from "express";
import asyncHandler from "express-async-handler";
import { dijkstra } from "../algorithm/ShortesPath.js";
import { puneGraph } from "../constants/PuneGraph.js";
import { EmployeesData, packages } from "./data.js";

function ConvertDate(date) {
  const isoDate = new Date(date);

  const year = isoDate.getFullYear();
  const month = isoDate.getMonth() + 1;
  const day = isoDate.getDate();

  return `${year}-${month}-${day}`;
}

const router = express.Router();

router.route("/:start/:end").get(
  asyncHandler(async (req, res) => {
    let start = req.params.start;
    let end = req.params.end;

    

    const path = dijkstra(puneGraph, start, end);

    //Optimized Algorithm O(n)

    const LocationSet = new Set(path);

    let packageContainer = packages.filter((packageVal, id) => {
      return LocationSet.has(packageVal.location);
    });

    if (packageContainer && path) {
      res.status(200).json({ path, packageContainer });
    } else {
      res.status(500).json("Invalid Location are passed");
    }
  })
);

function getTodaysOrder() {
  let today = ConvertDate(new Date().toISOString());

  console.log(ConvertDate(packages[0].deliveryDate), today);

  let todayPackages = packages.filter((packageVal, id) => {
    return ConvertDate(packageVal.deliveryDate) === today;
  });

  return todayPackages;
}

function filterOutEmployees() {
  let employees = EmployeesData.filter((val, id) => {
    return val.designation === "Delivery Boy";
  });

  return employees;
}

router.route("/todaysOrder").get(
  asyncHandler(async (req, res) => {
    const x = [1, 2, 3, 4];
    const y = ["x", "y", "z"];
    const m = y.length;
    const result = {};

    // shuffle the elements of x randomly
    const shuffledX = x.sort(() => Math.random() - 0.5);

    // randomly assign elements of x to elements of y
    for (let i = 0; i < shuffledX.length; i++) {
      const element = shuffledX[i];
      const randomIndex = Math.floor(Math.random() * m);
      const key = y[randomIndex];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(element);
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json("Error");
    }
  })
);

export default router;
