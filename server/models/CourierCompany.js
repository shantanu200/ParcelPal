import mongoose from "mongoose";

const courierCompany = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    contactPerson: {
      type: Object,
      required: true,
    },
    logo: {
      type: String,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    packages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
    otp: {
      type: String,
    },
  },
  { timestamps: true, strictPopulate: false }
);

export default mongoose.model("CourierCompany", courierCompany);
