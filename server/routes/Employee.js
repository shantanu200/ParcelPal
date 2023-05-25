import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeCompany,
  getEmployeeDetails,
  updateEmployeeById,
} from "../controllers/Employees.js";
const router = express.Router();

router.route("/:id").post(createEmployee).get(getEmployeeCompany);

router.route("/details/:id").get(getEmployeeDetails);

router.route("/updateEmployee/:id").post(updateEmployeeById);

router.route("/deleteEmployee/:id").get(deleteEmployee);

export default router;
