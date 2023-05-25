import mongoose from "mongoose";

const Employee = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      requried: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Delivery Person"],
      default: "Delivery Person",
    },
    assignedPackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourierPackage",
      },
    ],
    phoneNumber: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourierCompany",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employees", Employee);
