import asyncHandler from "express-async-handler";
import CourierCompany from "../models/CourierCompany.js";
import { genrateToken } from "../utils/Token.js";
import { createCompanyMail, sendMail } from "../services/MAIL.js";
import { genrateOTP } from "../services/OTP.js";

export const createCompany = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Invalid Query is passed by User");
  }

  const compExists = await CourierCompany.findOne({ email: req.body.email });

  if (compExists) {
    res.status(400).json({ status: false, msg: "Already Company Registered" });
    throw new Error("Already Company Registered");
  }

  try {
    const compCreated = await CourierCompany.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contactPerson: req.body.contactPerson,
    });

    if (compCreated) {
      res.status(201).json({
        _id: compCreated._id,
        name: compCreated.name,
        address: compCreated.address,
        contactPerson: compCreated.address,
        token: genrateToken(compCreated._id),
      });
      createCompanyMail({ to: req.body.email });
    }
  } catch (error) {
    res.status(400).json({ status: false, msg: "Server Overloaded......" });
    throw new Error("Server Overloaded......");
  }
});

export const SendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const comp = await CourierCompany.findOne({ email });

  if (comp) {
    const otp = genrateOTP();
    try {
      sendMail({
        to: email,
        OTP: otp,
      });

      comp.otp = otp;

      comp
        .save()
        .then(() => {
          res.status(200).json("OTP is Send on Email");
        })
        .catch((err) => {
          res.status(400).json(`Server Side Error Occur: ${err}`);
        });
    } catch (error) {
      res.json(400).json(`Server Side Error Occured ${error}`);
    }
  } else {
    res.status(400).json({ msg: "Email not exists in Database" });
  }
});

export const VerifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const comp = await CourierCompany.findOne({ email });

  if (comp && comp.otp === otp) {
    res.status(200).json({ msg: "Email Verified Successfully", comp });
  } else if (!comp) {
    res.status(400).json({ msg: "User not found on these email" });
    throw new Error("User not found on these email");
  } else {
    res.status(400).json({ msg: "Invalid OTP is entered" });
    throw new Error("Invalid OTP is entered");
  }
});

export const getCompDetailsByID = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (id) {
    const comp = await CourierCompany.findById(id);

    if (comp) {
      res.status(200).json(comp);
    } else {
      res.status(400).json({ status: false, msg: "Data Not Found on ID" });
      throw new Error("Data Not Found on ID");
    }
  }
});
