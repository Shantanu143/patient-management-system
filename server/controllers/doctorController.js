import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import patientModel from "../models/patientModel.js";
import prescriptionModel from "../models/prescriptionModel.js";

const loginDoctor = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "Login Doctor : some feilds are missing ",
      });
    }
    if (role !== "doctor") {
      return res.status(400).json({
        success: false,
        message: "Invalid role for this login endpoint.",
      });
    }
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found !!" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id, role }, process.env.JWT_SECRET);
      res.status(201).json({ success: true, token, role: "doctor" });
    } else {
      res.status(401).json({ success: true, message: "Invalid Credinatial" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "login doctor : " + error.message });
  }
};

const registerPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, address, diagnosis } = req.body;

    if (!name || !age || !gender || !contact || !address || !diagnosis) {
      return res.status(404).json({
        success: false,
        message: "Register Patient : Some feild are missing !!!",
      });
    }
    const doctorId = req.user.id;

    const patientData = {
      name,
      age,
      gender,
      contact,
      address,
      diagnosis,
      doctorId,
    };

    const newPatient = await new patientModel(patientData);
    const patient = await newPatient.save();

    res
      .status(200)
      .json({ success: true, message: "Patient added succefully" });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Register Patient Controller : " + error.message,
    });
  }
};

const getAllPatient = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const patients = await patientModel.find({ doctorId }).select("-password");
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Get All Patient Catch Block : " + error.message,
    });
  }
};

const getPatient = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { id: patientId } = req.params;

    const patient = await patientModel
      .findById({ _id: patientId, doctorId })
      .select("-password");

    if (!patient) {
      res.status(404).json({ success: false, message: "Patient Not Found " });
    }
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Get Patient Catch Block Error : " + error.message,
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const {
      _id: patientId,
      name,
      age,
      gender,
      contact,
      address,
      diagnosis,
    } = req.body;
    const doctorId = req.user.id;

    const missingFields = [];

    if (!doctorId) missingFields.push("doctorId");
    if (!patientId) missingFields.push("patientId");
    if (!name) missingFields.push("name");
    if (!age) missingFields.push("age");
    if (!gender) missingFields.push("gender");
    if (!contact) missingFields.push("contact");
    if (!address) missingFields.push("address");
    if (!diagnosis) missingFields.push("diagnosis");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing Fields : ${missingFields.join(", ")}`,
      });
    }
    const existingPatient = await patientModel.findById({
      _id: patientId,
      doctorId,
    });

    if (!existingPatient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not Found !!" });
    }

    const updatedPatientData = {
      name,
      age,
      gender,
      contact,
      address,
      diagnosis,
    };

    if (req.body.role) {
      return res.status(400).json({
        success: false,
        message: "Role updates are not allowed via this endpoint",
      });
    }

    await patientModel.findByIdAndUpdate(patientId, updatedPatientData, {
      new: true,
    });

    res.status(200).json({ success: true, message: "Patient Updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update Patient Catch Block Error : " + error.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.body;
    const doctorId = req.user.id;

    const deletePatient = await patientModel.findByIdAndDelete({
      _id: patientId,
      doctorId,
    });

    if (!deletePatient) {
      return res.status(401).json({
        success: false,
        message: "Not Authorise doctor to delete this ",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Patient Deleted Succesfully " });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete Patient Catch Block Error : " + error.message,
    });
  }
};

const addPrescription = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { medications, diagnosis, notes } = req.body;
    if ((!medications, !doctorId, !diagnosis, !notes)) {
      return res
        .status(400)
        .json({ success: false, message: "Some fileds are missing :)" });
    }

    const prescriptionData = {
      medications,
      doctorId,
      diagnosis,
      notes,
    };

    const prescription = await new prescriptionModel(prescriptionData);

    const data = await prescription.save();

    res.status(200).json({
      success: true,
      message: "Prescription Added successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Add Prescription Catch Block Error : " + error.message,
    });
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const prescriptionDetials = await prescriptionModel.find({
      doctorId,
    });
    res.status(200).json({ success: true, data: prescriptionDetials });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "get all prescription catch block error :  " + error.message,
    });
  }
};

export {
  loginDoctor,
  registerPatient,
  getAllPatient,
  getPatient,
  updatePatient,
  deletePatient,
  addPrescription,
  getAllPrescriptions,
};
