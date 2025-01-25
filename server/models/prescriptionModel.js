import mongoose from "mongoose";

const PrescriptionSchema = mongoose.Schema(
  {
    medications: [
      {
        medicineName: { type: String, required: true },
        dose: { type: String, required: true },
        duration: { type: String, required: true },
      },
    ],
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      require: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      require: true,
    },
    diagnosis: {
      type: String,
      require: false,
    },
    notes: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const prescriptionModel =
  mongoose.model.prescription ||
  mongoose.model("prescription", PrescriptionSchema);

export default prescriptionModel;
