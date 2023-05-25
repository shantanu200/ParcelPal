import express from "express";
import {
  SendOTP,
  VerifyEmail,
  createCompany,
  getCompDetailsByID,
} from "../controllers/CourierCompany.js";

const router = express.Router();

/**
 * Route :: `/`
 * Operation :: Create Company
 * Type :: POST
 */

router.route("/").post(createCompany);

/**
 * Route :: `/sendOTP`
 * Operation :: Send OTP on company email
 * Type :: POST
 */
router.route("/sendOTP").post(SendOTP);

/**
 * Route :: `/login`
 * Operation :: Validate OTP and logging CompanyAdmin
 * Type :: POST
 */

router.route("/login").post(VerifyEmail);

/**
 * Route :: `/details/:id`
 * Operation :: Get Company Details By ID Key
 * Type :: GET
 */

router.route("/details/:id").get(getCompDetailsByID);

export default router;
