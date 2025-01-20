import { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";

const AddPrescription = () => {
  const { addPrescription } = useContext(DoctorContext);

  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState([
    { medicineName: "", dose: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const addMedicationField = () => {
    setMedications([...medications, { medicineName: "", dose: "", duration: "" }]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      addMedicationField();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prescriptionData = { diagnosis, medications, notes };
    addPrescription(prescriptionData);
  };

  return (
    <div className="sm:ml-64 pt-20 px-10">
      <h2 className="text-2xl font-semibold mb-6">Add Prescription</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg font-medium mb-4">Patient Name: Shantanu</p>
        <form onSubmit={handleSubmit}>
          {/* Diagnosis Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis"
              required
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Medications Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medications
            </label>
            {medications.map((med, index) => (
              <div key={index} className="mb-4 grid grid-cols-3 gap-4">
                <input
                  type="text"
                  value={med.medicineName}
                  onChange={(e) =>
                    handleMedicationChange(index, "medicineName", e.target.value)
                  }
                  placeholder="Medication Name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={med.dose}
                  onChange={(e) =>
                    handleMedicationChange(index, "dose", e.target.value)
                  }
                  placeholder="Dosage (e.g., 1 morning, 1 night)"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={med.duration}
                  onChange={(e) =>
                    handleMedicationChange(index, "duration", e.target.value)
                  }
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  placeholder="Duration (e.g., 7 days)"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addMedicationField}
              className="text-green-500 text-sm font-medium hover:text-green-700 "
            >
              + Add another medication
            </button>
          </div>

          {/* Notes Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            ></input>
          </div>

          {/* Submit Button */}
          <div className="flex text-center">
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-medium rounded-lg p-2 text-sm hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            >
              Save & Print
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrescription;
