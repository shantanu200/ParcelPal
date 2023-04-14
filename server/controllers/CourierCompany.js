import asyncHandler from "express-async-handler";
import CourierCompany from "../models/CourierCompany.js";
import { genrateToken } from "../utils/Token.js";
import { createCompanyMail } from "../services/MAIL.js";

export const createCompany = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Invalid Query is passed by User");
  }

  const compExists = await CourierCompany.findOne({ email: req.body.email });

  if (compExists) {
    res.status(400);
    throw new Error("Already Company Registered");
  }

  try {
    const comp = await CourierCompany.create({
      name: req.body.name,
      address: req.body.address,
      contactPerson: req.body.contactPerson,
      logo: req.body.logo,
    });

    if (comp) {
      createCompanyMail({ to: req.body.email });
      res.status(201).json({
        _id: comp._id,
        name: comp.name,
        address: comp.address,
        contactPerson: comp.address,
        logo: comp.logo,
        token: genrateToken(comp._id),
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Server Overloaded :: ", error);
  }
});
