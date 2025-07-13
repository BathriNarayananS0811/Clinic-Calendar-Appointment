import React, { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";

const Calendar = ({ darkMode, toggleDarkMode }) => {
  const [appointments, setAppointments] = useState(() => JSON.parse(localStorage.getItem("appointments")) || []);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [formVisible, setFormVisible] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterPatient, setFilterPatient] = useState("");

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appt) => {
    setAppointments([...appointments, appt]);
  };

  const deleteAppointment = (indexToDelete) => {
    setAppointments(appointments.filter((_, i) => i !== indexToDelete));
  };

  const filteredAppointments = appointments
    .filter(a => a.date === selectedDate)
    .filter(a => a.doctor.toLowerCase().includes(filterDoctor.toLowerCase()))
    .filter(a => a.patient.toLowerCase().includes(filterPatient.toLowerCase()));

  return (
    <div className="container">
      <h2>Appointments for {selectedDate}</h2>
      <button onClick={toggleDarkMode} style={{ marginBottom: '1rem' }}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <input placeholder="Filter by Doctor" value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)} />
      <input placeholder="Filter by Patient" value={filterPatient} onChange={(e) => setFilterPatient(e.target.value)} />
      <button onClick={() => setFormVisible(true)}>Add Appointment</button>
      <ul>
        {filteredAppointments.map((a, i) => (
          <li key={i}>
            {a.time} - {a.patient} with  {a.doctor}
            <button onClick={() => deleteAppointment(i)} style={{ marginLeft: '1rem' }}>Delete</button>
          </li>
        ))}
      </ul>
      {formVisible && <AppointmentForm date={selectedDate} onClose={() => setFormVisible(false)} onSave={addAppointment} />}
    </div>
  );
};

export default Calendar;