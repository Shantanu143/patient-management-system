import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrescriptionHistory = () => {
  const { patientId } = useParams(); // Get patient ID from route parameters
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPrescriptions, setExpandedPrescriptions] = useState({}); // Track expanded state

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      try {
        const data = [
          {
            _id: '1',
            date: '2025-01-01',
            diagnosis: 'Malaria',
            medications: [
              {
                name: 'Paracetamol',
                dosage: '1 morning, 1 night',
                duration: '10 days (20 tablets)',
              },
              {
                name: 'Ibuprofen',
                dosage: '1 after lunch',
                duration: '5 days (5 tablets)',
              },
            ],
            notes: 'Take with food.',
          },
          {
            _id: '2',
            date: '2025-01-10',
            diagnosis: 'Typhoid',
            medications: [
              {
                name: 'Amoxicillin',
                dosage: '1 morning, 1 night',
                duration: '7 days (14 tablets)',
              },
              {
                name: 'Vitamin C',
                dosage: '1 after breakfast',
                duration: '7 days (7 tablets)',
              },
            ],
            notes: 'Complete the full course.',
          },
        ];
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescription history:', error);
      }
      setLoading(false);
    };

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId]);

  const toggleExpand = (id) => {
    setExpandedPrescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) {
    return <p>Loading prescription history...</p>;
  }

  if (prescriptions.length === 0) {
    return <p>No prescriptions found for this patient.</p>;
  }

  return (
    <div className="sm:ml-64 pt-20 px-10">
      <h2 className="text-2xl font-semibold mb-2">Prescription History</h2>
      <div className="mb-6 px-2">
        <div className="flex md:flex-row flex-col md:w-full w-1/2 justify-between">
          <div>
            <p className="font-medium text-lg">Shantanu Nirpal</p>
            <div className="flex flex-row gap-2 text-sm font-medium">
              <span>Age: 21</span>
              <span>Gender: Male</span>
            </div>
          </div>
          <Link
            to={`/doctor-dashboard/add-prescription`}
            className="text-white bg-green-500 font-medium rounded-lg text-sm px-3 py-2.5 text-center my-2 mb-2 hover:bg-green-600"
          >
            Add Prescription
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Diagnosis</th>
              <th className="px-6 py-3">Medication</th>
              <th className="px-6 py-3">Dosage</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Notes</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => {
              const isExpanded =
                expandedPrescriptions[prescription._id] || false;
              return prescription.medications.map((med, index) => {
                const showRow = isExpanded || index === 0;
                return (
                  showRow && (
                    <tr
                      key={`${prescription._id}-${index}`}
                      className={`bg-white border-b hover:bg-gray-50 ${
                        index === prescription.medications.length - 1
                          ? 'border-b-2 border-gray-300'
                          : ''
                      }`}
                    >
                      {index === 0 && (
                        <>
                          <td
                            className="px-6 py-4"
                            rowSpan={
                              isExpanded ? prescription.medications.length : 1
                            }
                          >
                            {prescription.date}
                          </td>
                          <td
                            className="px-6 py-4"
                            rowSpan={
                              isExpanded ? prescription.medications.length : 1
                            }
                          >
                            {prescription.diagnosis}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4">{med.name}</td>
                      <td className="px-6 py-4">{med.dosage}</td>
                      <td className="px-6 py-4">{med.duration}</td>
                      {index === 0 && (
                        <>
                          <td
                            className="px-6 py-4"
                            rowSpan={
                              isExpanded ? prescription.medications.length : 1
                            }
                          >
                            {prescription.notes || 'N/A'}
                          </td>
                          <td
                            className="px-6 py-4"
                            rowSpan={
                              isExpanded ? prescription.medications.length : 1
                            }
                          >
                            <button
                              onClick={() => toggleExpand(prescription._id)}
                              className="text-white bg-blue-500 font-medium rounded-lg text-sm px-2 py-1 hover:bg-blue-600"
                            >
                              {isExpanded ? 'Hide All' : 'View All'}
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionHistory;
