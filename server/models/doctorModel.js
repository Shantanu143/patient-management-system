import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    specialization: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    availability: {
      days: {
        type: [String],
        require: true,
      },
      hours: {
        start: {
          type: String,
          require: true,
        },
        end: {
          type: String,
          require: true,
        },
      },
    },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const doctorModel =
  mongoose.model.doctor || mongoose.model("doctor", DoctorSchema);

export default doctorModel;
