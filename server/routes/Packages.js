import express from "express";
import { assignPackage, createPackage, directionOfPackage, getPackages } from "../controllers/Packages.js";

const router = express.Router();

router.route("/createPackage/:id").post(createPackage);

router.route("/getPackages/:id").get(getPackages);

router.route("/assignPackage").post(assignPackage);

router.route("/directionOfPackage/:id").get(directionOfPackage);
export default router;
