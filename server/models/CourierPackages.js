import mongoose from "mongoose";
const courierPackageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderAddress: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverAddress: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Transit", "Delivered"],
    default: "Pending",
  },
  deliveryDate: {
    type: Date,
  },
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  scheduledShipment: {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  location: {
    type: String,
    required: true,
  },
});

export default mongoose.model("CourierPackage", courierPackageSchema);
