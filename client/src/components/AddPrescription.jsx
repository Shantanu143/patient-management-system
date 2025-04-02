import medicineData from '/medicineData.json';
import { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { useParams } from 'react-router-dom';

const AddPrescription = () => {
  const { addPrescription } = useContext(DoctorContext);
  const { patientId } = useParams();
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState([
    { medicineName: '', dose: '', duration: '' },
  ]);
  const [notes, setNotes] = useState('');
  const [suggestions, setSuggestions] = useState({});

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;

    if (field === 'medicineName') {
      if (value.trim() === '') {
        setSuggestions((prev) => ({ ...prev, [index]: [] }));
      } else {
        const matches = medicineData
          .filter((medicine) =>
            medicine.name.toLowerCase().startsWith(value.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions((prev) => ({ ...prev, [index]: matches }));
      }
    }

    setMedications(updatedMedications);
  };

  const handleSuggestionClick = (index, suggestion) => {
    const updatedMedications = [...medications];
    updatedMedications[index].medicineName = suggestion.name;
    setMedications(updatedMedications);
    setSuggestions((prev) => ({ ...prev, [index]: [] })); // Clear suggestions after selection
  };

  const addMedicationField = () => {
    setMedications([
      ...medications,
      { medicineName: '', dose: '', duration: '' },
    ]);
  };

  const removeMedicationField = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
    setSuggestions((prev) => {
      const updatedSuggestions = { ...prev };
      delete updatedSuggestions[index];
      return updatedSuggestions;
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addMedicationField();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prescriptionData = { diagnosis, medications, notes, patientId };
    addPrescription(prescriptionData);
  };

  return (
    <div className="sm:ml-64 px-10 pt-20">
      <h2 className="mb-6 font-semibold text-2xl">Add Prescription</h2>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Diagnosis Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Diagnosis
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis"
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-sm"
            />
          </div>

          {/* Medications Fields */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Medications
            </label>
            {medications.map((med, index) => (
              <div
                key={index}
                className="relative gap-4 grid grid-cols-10 mb-4"
              >
                <div className="col-span-3">
                  <input
                    type="text"
                    value={med.medicineName}
                    onChange={(e) =>
                      handleMedicationChange(
                        index,
                        'medicineName',
                        e.target.value
                      )
                    }
                    placeholder="Medication Name"
                    required
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-sm"
                  />
                  {/* Suggestions Dropdown */}
                  {suggestions[index]?.length > 0 && (
                    <ul className="z-10 absolute bg-white shadow-md mt-1 border border-gray-300 rounded-lg w-full max-h-40 overflow-y-auto">
                      {suggestions[index]?.map((suggestion, i) => (
                        <li
                          key={i}
                          onClick={() =>
                            handleSuggestionClick(index, suggestion)
                          }
                          className="hover:bg-gray-100 p-2 text-sm cursor-pointer"
                        >
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="text"
                  value={med.dose}
                  onChange={(e) =>
                    handleMedicationChange(index, 'dose', e.target.value)
                  }
                  placeholder="Dosage (e.g., 1 morning, 1 night)"
                  required
                  className="col-span-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-sm"
                />
                <input
                  type="text"
                  value={med.duration}
                  onChange={(e) =>
                    handleMedicationChange(index, 'duration', e.target.value)
                  }
                  onKeyDown={handleKeyPress}
                  placeholder="Duration (e.g., 7 days)"
                  required
                  className="col-span-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeMedicationField(index)}
                  className="col-span-1 font-medium text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMedicationField}
              className="font-medium text-green-500 hover:text-green-700 text-sm"
            >
              + Add another medication
            </button>
          </div>

          {/* Notes Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Notes
            </label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
              rows="4"
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-sm"
            ></input>
          </div>

          {/* Submit Button */}
          <div className="flex text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 p-2 rounded-lg focus:ring-2 focus:ring-green-500 w-full font-medium text-white text-sm"
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
