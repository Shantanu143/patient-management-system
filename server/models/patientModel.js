import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    medicalHistory: { type: [String], default: [] },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctor',
      required: true,
    },
    diagnosis: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const patientModel =
  mongoose.model.patient || mongoose.model('patient', PatientSchema);

export default patientModel;
