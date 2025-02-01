import bcrypt, { genSalt } from 'bcrypt';
import validator from 'validator';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// API to login admin

const loginAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (role !== process.env.ADMIN_ROLE) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role for this login endpoint.',
      });
    }
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const payload = { email, role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(202).json({ success: true, token, role: 'admin' });
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Invalid Credentials !!' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'login admin error : ' + error.message,
    });
  }
};

// API to register a doctor
const registerDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      password,
      specialization,
      phone,
      availability,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !phone ||
      !availability ||
      !address
    ) {
      return res
        .status(401)
        .json({ success: false, message: 'Some fields are missing !!!' });
    }

    const existingDoctor = await doctorModel.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this email id already exits ',
      });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Email address is not valid ' });
    }

    // strong password validation

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Enter a Min 8 latter Strong password !!',
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
      address,
      role: 'doctor',
    };

    const newDoctor = new doctorModel(doctorData);
    const doctor = await newDoctor.save();

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({ success: true, message: 'Doctor Registerd !!' });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to get all the doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Get All Doctor Error : ' + error.message,
    });
  }
};

const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorModel.findById(id).select('-password');

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: 'Doctor Not Found' });
    }
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Get Doctor Error : ' + error.message });
  }
};

// API to update doctor
const updateDoctor = async (req, res) => {
  try {
    const {
      _id: docId,
      name,
      email,
      password,
      specialization,
      phone,
      availability,
      address,
    } = req.body;

    const missingFields = [];

    if (!docId) missingFields.push('id');
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!specialization) missingFields.push('specialization');
    if (!phone) missingFields.push('phone');
    if (!availability) missingFields.push('availability');
    if (!address) missingFields.push('address');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing Fields : ${missingFields.join(', ')}`,
      });
    }

    const existingDoctor = await doctorModel.findById(docId);
    if (!existingDoctor) {
      return res
        .status(404)
        .json({ success: false, message: 'Doctor not Found !!' });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email address !!' });
    }

    // check if email is being updated and is already in use

    if (email !== existingDoctor.email) {
      const emailInUse = await doctorModel.findOne({ email });
      if (emailInUse) {
        return res
          .status(400)
          .json({ success: false, message: 'Email is already in use !!!' });
      }
    }

    // validate password length
    if (password.length < 8) {
      return res.status(500).json({
        success: false,
        message: 'Enter must be at least 8 characters long !!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedDoctorData = {
      name,
      email,
      password: hashedPassword,
      specialization,
      phone,
      availability,
      address,
    };

    if (req.body.role) {
      return res.status(400).json({
        success: false,
        message: 'Role updates are not allowed via this endpoint',
      });
    }

    await doctorModel.findByIdAndUpdate(docId, updatedDoctorData, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: 'Doctor Updated Successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Update Doctor Error : ' + error.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: 'Doctor id requrired' });
    }
    const deleteDoctor = await doctorModel.findByIdAndDelete(docId);

    if (!deleteDoctor) {
      return res
        .status(404)
        .json({ success: false, message: 'Doctor does not exist !!' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Doctor deleted Successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete doctor Error : ' + error.message,
    });
  }
};

export {
  registerDoctor,
  loginAdmin,
  updateDoctor,
  getDoctor,
  getAllDoctors,
  deleteDoctor,
};
