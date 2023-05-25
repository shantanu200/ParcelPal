import asyncHandler from "express-async-handler";
import CourierCompany from "../models/CourierCompany.js";
import Employee from "../models/Employee.js";
export const createEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (id) {
    const comp = await CourierCompany.findById(id);

    if (comp) {
      const { name, email, password, role, phoneNumber } = req.body;

      const employee = await Employee.create({
        name,
        email,
        password,
        role,
        phoneNumber,
      });

      if (employee) {
        await CourierCompany.updateOne(
          { _id: id },
          { $push: { employees: employee._id } }
        );

        res
          .status(200)
          .json({ status: true, msg: "Employee Details added successfully" });
      } else {
        res
          .status(400)
          .json({ staus: false, msg: "Error in document creation" });
        throw new Error("Error in document creation");
      }
    } else {
      res.status(400).json({ staus: false, msg: "Server Overloaded..." });
      throw new Error("Server Overloaded...");
    }
  }
});

export const getEmployeeCompany = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const data = await CourierCompany.findById(id)
    .populate({ path: "employees", model: "Employees" })
    .exec();

  if (data) {
    res.status(200).json(data.employees);
  }
});

export const getEmployeeDetails = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (id) {
    const empDetails = await Employee.findById(id);

    if (empDetails) {
      res.status(200).json(empDetails);
    } else {
      res.status(400).json({ staus: false, msg: "Error in document search" });
      throw new Error("Error in document search");
    }
  } else {
    res.status(400).json({ staus: false, msg: "Server Overloaded..." });
    throw new Error("Server Overloaded...");
  }
});

export const updateEmployeeById = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (id) {
    const { name, email, role, phoneNumber } = req.body;

    const updatedEmp = await Employee.findByIdAndUpdate(
      id,
      { name, email, role, phoneNumber },
      { new: true }
    );

    if (updatedEmp) {
      res
        .status(200)
        .json({ status: true, msg: "Employee updated successfully" });
    } else {
      res.status(400).json({ status: false, msg: "Invalid Updatation" });
      throw new Error("Invalid Updatation");
    }
  } else {
    res.status(400).json({ status: false, msg: "Invalid ID is passed" });
    throw new Error("Invalid ID is passed");
  }
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (id) {
    const empDetails = await Employee.findByIdAndRemove(id);

    if (empDetails) {
      res
        .status(200)
        .json({ status: true, msg: "Employee deleted successfully" });
    } else {
      res.status(400).json({ status: false, msg: "Invalid Delete Operation" });
      throw new Error("Invalid Delete Operation");
    }
  } else {
    res.status(400).json({ status: false, msg: "Invalid ID is passed" });
    throw new Error("Invalid ID is passed");
  }
});
