import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    age: { type: Number, require: true },
    gender: { type: String, require: true },
    contact: { type: String, require: true },
    address: { type: String, require: true },
    medicalHistory: { type: [String], default: [] },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      require: true,
    },
    diagnosis: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const patientModel =
  mongoose.model.patient || mongoose.model("patient", PatientSchema);

export default patientModel;
