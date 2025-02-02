import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    availability: {
      startDay: {
        type: String,
        required: true,
      },
      endDay: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const doctorModel =
  mongoose.model.doctor || mongoose.model('doctor', DoctorSchema);

export default doctorModel;
