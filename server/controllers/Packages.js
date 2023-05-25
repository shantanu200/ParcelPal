import asyncHandler from "express-async-handler";
import CourierPackages from "../models/CourierPackages.js";
import CourierCompany from "../models/CourierCompany.js";
import router from "../routes/Packages.js";
import { puneGraph, puneLocation } from "../constants/PuneGraph.js";
import { dijkstra } from "../algorithm/ShortesPath.js";

export const createPackage = asyncHandler(async (req, res) => {
  let compID = req.params.id;
  if (!req.body) {
    res
      .status(400)
      .json({ status: false, msg: "Invalid request body is passed" });
    throw new Error("Invalid request body is passed");
  }

  const {
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    weight,
    status,
    deliveryDate,
  } = req.body;

  const cPackage = await CourierPackages.create({
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    weight,
    status,
    deliveryDate,
  });

  if (cPackage) {
    await CourierCompany.updateOne(
      { _id: compID },
      { $push: { packages: cPackage._id } }
    );
    res.status(200).json({ status: true, msg: "New Package is created" });
  } else {
    res.status(400).json({ status: false, msg: "Server Overloaded" });
  }
});

export const getPackages = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (id) {
    const data = await CourierCompany.findById(id)
      .populate({
        path: "packages",
        model: "CourierPackage",
      })
      .exec();

    if (data) {
      res.status(200).json(data.packages);
    }
  } else {
    res.status(400).json({ status: false, msg: "Invalid id is passed" });
    throw new Error("Invalid id is passed");
  }
});

export const assignPackage = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const { empID, packageID } = req.body;

  if (empID && packageID) {
    const assignPkg = await CourierPackages.updateOne(
      { _id: packageID },
      { $set: { deliveryPerson: empID } }
    );

    if (assignPkg) {
      res
        .status(200)
        .json({ status: true, msg: "Package is succesfully Assign" });
    } else {
      res.status(400).json({ status: false, msg: "Server Overloaded.." });
      throw new Error("Server Overloaded..");
    }
  }
});

export const directionOfPackage = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const packageDetails = await CourierPackages.findById(id);

  if (packageDetails) {
    let startLocation = packageDetails.senderAddress;
    let endLocation = packageDetails.receiverAddress;

    if (!startLocation || !endLocation) {
      res
        .status(400)
        .json({ status: false, msg: "Invalid Cities data entered" });
    }

    let startIdx = puneLocation.findIndex((val) => startLocation.toLowerCase().includes(val.toLowerCase()));
    let endIdx = puneLocation.findIndex((val) => endLocation.toLowerCase().includes(val.toLowerCase()));

    if (startIdx >= 0 && endIdx >= 0) {
      const path = dijkstra(
        puneGraph,
        puneLocation[startIdx],
        puneLocation[endIdx]
      );

      res.status(200).json(path);
    }
  }
});
