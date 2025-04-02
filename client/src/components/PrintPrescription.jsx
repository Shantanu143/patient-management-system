import { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { DoctorContext } from '../context/DoctorContext';

const PrintPrescription = () => {
  const location = useLocation();
  const {
    diagnosis = '',
    medications = [],
    notes = '',
    patientId = '',
  } = location.state || {};
  const prescriptionRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: prescriptionRef,
  });

  const { getPatient, patient, doctor } = useContext(DoctorContext);

  useEffect(() => {
    getPatient(patientId);
  }, []);

  let today = new Date();
  today.setDate(today.getDate() + 3);
  let newFolloUpDate = today.toDateString();
  const prescriptionData = {
    doctor: {
      doctorName: doctor.name,
      qualifications: 'M.B.B.S., M.D., M.S.',
      regNo: '270988',
      contact: doctor.phone,
    },
    clinic: {
      clinicName: 'Care Clinic',
      address: 'Near Axis Bank, Kothrud, Pune - 411038',
      phone: '09423380390',
      timings: '09:00 AM - 02:00 PM',
      closedDay: 'Thursday',
    },
    patient: {
      id: '266',
      patientName: patient.name,
      address: `${patient.address.slice(0, 21)}....`,
      temp: '36°C',
      bp: '120/80 mmHg',
    },
    prescriptionDate: today.toString().slice(0, 21),
    followUpDate: newFolloUpDate,
    advice: notes,
    medicines: medications,
    diagnosis: diagnosis,
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div
        ref={prescriptionRef}
        className="flex flex-col justify-center mx-auto p-6 border max-w-4xl text-sm prescription-container"
      >
        {/* Header */}
        <div className="flex flex-col justify-between h-full prescription-content">
          <div className="flex justify-between items-start pb-4 border-b">
            <div>
              <h1 className="font-semibold text-green-400 text-lg">
                {prescriptionData.doctor.doctorName}
              </h1>
              <p>{prescriptionData.doctor.qualifications}</p>
              <p>Reg. No: {prescriptionData.doctor.regNo}</p>
              <p>Mob: {prescriptionData.doctor.contact}</p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold text-green-400 text-lg">
                {prescriptionData.clinic.clinicName}
              </h2>
              <p>{prescriptionData.clinic.address}</p>
              <p>Ph: {prescriptionData.clinic.phone}</p>
              <p>
                Timing: {prescriptionData.clinic.timings}, Closed:{' '}
                {prescriptionData.clinic.closedDay}
              </p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="mt-4">
            <div className="flex justify-between items-end">
              <div>
                <p>ID: {prescriptionData.patient.id}</p>
                <p>
                  <span className="font-bold">Patient Name:</span>{' '}
                  {prescriptionData.patient.patientName}
                </p>
                <p>
                  <span className="font-bold">Address:</span>{' '}
                  {prescriptionData.patient.address}
                </p>
              </div>
              <div className="text-right">
                <p>Date: {prescriptionData.prescriptionDate}</p>
                <p>
                  Temp (°C): {prescriptionData.patient.temp}, BP:{' '}
                  {prescriptionData.patient.bp}
                </p>
              </div>
            </div>
          </div>

          {/* Dignoasis */}
          <div className="mt-4">
            <div className="flex justify-start items-end gap-1">
              <span className="font-bold">Diagnosis:</span>

              <div className="capitalize"> {prescriptionData.diagnosis}</div>
            </div>
          </div>

          {/* Medicines Table */}
          <table className="mt-4 w-full text-left border-collapse">
            <thead>
              <tr className="border-t-2 border-b-2 border-black">
                <th className="p-2">Medicine Name</th>
                <th className="p-2">Dosage</th>
                <th className="p-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {prescriptionData.medicines.map((medicine, index) => (
                <tr key={index} className="">
                  <td className="p-2">{medicine.medicineName}</td>
                  <td className="p-2">{medicine.dose}</td>
                  <td className="p-2">{medicine.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Advice and Follow-up */}
          <div className="mt-4">
            <p>
              <span className="font-bold">Advice Given:</span>{' '}
              {prescriptionData.advice}
            </p>
            <p>
              <span className="font-bold">Follow-up:</span>{' '}
              {prescriptionData.followUpDate}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-right">
            <p className="font-bold">
              Signature
              <br />
              {prescriptionData.doctor.medicineName}
            </p>
          </div>
        </div>

        {/* Print Button */}
      </div>
      <div className="mt-6 px-2 py-1 text-center">
        <button
          onClick={handlePrint}
          className="bg-green-500 hover:bg-green-600 p-2 rounded-lg font-medium text-white text-sm"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default PrintPrescription;
