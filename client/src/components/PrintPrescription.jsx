import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const PrintPrescription = () => {
  const location = useLocation();
  const { diagnosis = '', medications = [], notes = '' } = location.state || {};

  const prescriptionRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: prescriptionRef,
  });

  const prescriptionData = {
    doctor: {
      medicineName: 'Dr. Onkar Bhave',
      qualifications: 'M.B.B.S., M.D., M.S.',
      regNo: '270988',
      contact: '8983390126',
    },
    clinic: {
      medicineName: 'Care Clinic',
      address: 'Near Axis Bank, Kothrud, Pune - 411038',
      phone: '09423380390',
      timings: '09:00 AM - 02:00 PM',
      closedDay: 'Thursday',
    },
    patient: {
      id: '266',
      medicineName: 'DEMO PATIENT (M)',
      address: 'PUNE',
      temp: '36°C',
      bp: '120/80 mmHg',
    },
    prescriptionDate: '27-Apr-2020, 04:37 PM',
    followUpDate: '12-May-2020',
    advice: notes,
    medicines: medications,
    diagnosis: diagnosis,
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen">
      <div
        ref={prescriptionRef}
        className="prescription-container border flex flex-col justify-center p-6 max-w-4xl mx-auto text-sm "
      >
        {/* Header */}
        <div className="prescription-content h-full flex flex-col justify-between">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h1 className="text-lg font-semibold text-green-400">
                {prescriptionData.doctor.medicineName}
              </h1>
              <p>{prescriptionData.doctor.qualifications}</p>
              <p>Reg. No: {prescriptionData.doctor.regNo}</p>
              <p>Mob: {prescriptionData.doctor.contact}</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-green-400">
                {prescriptionData.clinic.medicineName}
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
                  <span className="font-bold">medicineName:</span>{' '}
                  {prescriptionData.patient.medicineName}
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
            <div className="flex justify-start gap-1 items-end">
              <span className="font-bold">Diagnosis:</span>

              <div className="capitalize"> {prescriptionData.diagnosis}</div>
            </div>
          </div>

          {/* Medicines Table */}
          <table className="w-full mt-4 border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-t-2 border-black">
                <th className="p-2">Medicine medicineName</th>
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
          <div className="text-right mt-6">
            <p className="font-bold">
              Signature
              <br />
              {prescriptionData.doctor.medicineName}
            </p>
          </div>
        </div>

        {/* Print Button */}
      </div>
      <div className="text-center px-2 py-1 mt-6">
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white font-medium rounded-lg p-2 text-sm hover:bg-green-600"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default PrintPrescription;
