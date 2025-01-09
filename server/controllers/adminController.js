import bcrypt from "bcrypt";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// API to login admin

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const role = process.env.ROLE;
      const payload = { email, role };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(202).json({ success: true, token });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid Credentials !!" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "login admin error : " + error.message,
    });
  }
};

// API to register a doctor
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, phone, availability, role } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !phone ||
      !availability ||
      !role
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Some fields are missing !!!" });
    }

    const existingDoctor = await doctorModel.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email id already exits ",
      });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email address is not valid " });
    }

    // strong password validation

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Enter a Min 8 latter Strong password !!",
      });
    }

    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      specialization,
      phone,
      availability,
      role,
    };

    console.log(doctorData);

    const newDoctor = new doctorModel(doctorData);
    const doctor = await newDoctor.save();

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(201).json({ success: true, message: "Doctor Registerd !!" });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export { registerDoctor, loginAdmin };
