# Doctor Management System

## Introduction
The Doctor Management System is a web-based platform designed to streamline administrative and operational tasks for healthcare professionals and administrators. This system includes two roles:

- **Admin**: Responsible for managing doctors.
- **Doctor**: Manages patient details, prescriptions, bills, and medical certificates.

This system enhances efficiency, reduces paperwork, and simplifies the management process for healthcare providers.

---

## System Overview

### Roles and Features

#### 1. Admin
- Add, update, and delete doctors.
- View a list of all doctors.

#### 2. Doctor
- Add patient details.
- Add prescriptions for patients.
- View a list of patients they have treated.
- Print prescriptions, bills, and medical certificates.
- Add and remove medicines.

#### Additional Feature
- Attendants can register patient appointments via a separate API.

---

## System Architecture

### client
**Framework**: React.js

#### Components
- **Authentication**: Separate login pages for Admin and Doctor.
- **Forms**:
  - Admin: Manage doctors.
  - Doctor: Add patients and prescriptions.
- **Table/List Views**:
  - Admin: Doctors list.
  - Doctor: Patients list.
- **Print Views**:
  - Printable pages for prescriptions and bills.

### server
**Framework**: Express.js

#### Endpoints

| Endpoint                       | Method | Role   | Description                        |
|--------------------------------|--------|--------|------------------------------------|
| `/api/auth/login`              | POST   | Admin/Doctor | Login with role-based authentication. |
| `/api/admin/doctors`           | GET    | Admin  | Fetch all doctors.                 |
| `/api/admin/doctors`           | POST   | Admin  | Add a new doctor.                  |
| `/api/admin/doctors/:id`       | PUT    | Admin  | Update doctor details.             |
| `/api/admin/doctors/:id`       | DELETE | Admin  | Delete a doctor.                   |
| `/api/doctor/patients`         | GET    | Doctor | Fetch all patients treated.        |
| `/api/doctor/patients`         | POST   | Doctor | Add a new patient.                 |
| `/api/doctor/prescriptions`    | POST   | Doctor | Add a prescription for a patient.  |
| `/api/doctor/prescriptions/print/:id` | GET | Doctor | Generate a printable prescription. |
| `/api/doctor/bills/print/:id`  | GET    | Doctor | Generate a printable bill.         |
| `/api/medicine/add`            | POST   | Doctor | Add a new medicine.                |
| `/api/medicine/remove/:id`     | DELETE | Doctor | Remove a medicine.                 |
| `/api/appointments`            | POST   | Attendant | Register a patient appointment. |

---

## Database

**Database**: MongoDB

#### Collections

1. **Users**:
   - `_id`
   - `name`
   - `email`
   - `password` (hashed)
   - `role` (`admin` or `doctor`)

2. **Doctors**:
   - `_id`
   - `name`
   - `email`
   - `specialization`
   - `phone`
   - `availability` (working hours, days)

3. **Patients**:
   - `_id`
   - `doctorId` (reference to Doctors)
   - `name`
   - `age`
   - `gender`
   - `contact`
   - `medicalHistory`

4. **Prescriptions**:
   - `_id`
   - `patientId` (reference to Patients)
   - `doctorId` (reference to Doctors)
   - `medicines` (array)
   - `diagnosis`
   - `date`

5. **Bills**:
   - `_id`
   - `patientId` (reference to Patients)
   - `doctorId` (reference to Doctors)
   - `amount`
   - `services`
   - `date`

---

## Technology Stack

- **client**: React.js, Redux, Axios
- **server**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication for secure login.

---

## Flow Diagrams

### Admin Workflow
1. Login
2. Navigate to Admin Dashboard.
3. Manage doctors:
   - Add, Update, or Delete doctors.

### Doctor Workflow
1. Login.
2. Navigate to Doctor Dashboard.
3. Manage patients:
   - Add patient details.
   - Add prescriptions.
   - Print prescriptions and bills.

---

## client-server Integration

### Authentication
- **JWT Authentication**: Ensures secure login and role-based access control.

### API Interaction
- client communicates with the server using Axios for API requests.
- React Query is used for efficient data fetching and caching.

---

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone [text](https://github.com/Shantanu143/patient-management-system.git)
   cd doctor-management-system
   ```

2. **Install dependencies:**
   - For the client:
     ```bash
     cd client
     npm install
     ```
   - For the server:
     ```bash
     cd server
     npm install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in the server directory and configure the following:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

4. **Run the application:**
   - Start the server server:
     ```bash
     cd server
     npm run dev
     ```
   - Start the client:
     ```bash
     cd client
     npm run dev
     ```

5. **Access the application:**
   - Admin portal will be available at `http://localhost:5173`.
   - Doctor portal will be available at `http://localhost:4001 || 4000`.

---

## Future Enhancements

- Integration of SMS/email notifications for appointments.
- Advanced analytics and reporting for Admins.
- Enhanced role-based permissions for additional user roles (e.g., receptionist).
- Implementation of a calendar view for doctor appointments.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contribution

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## Contact

For any queries or issues, please contact:
- Email: [shantanunirapal@gmail.com](mailto:shantanunirapal@gmail.com?subject=Hello&body=I%20have%20a%20question%20about%20your%20project).
- GitHub: [GitHub Repository](https://github.com/Shantanu143/patient-management-system.git)

