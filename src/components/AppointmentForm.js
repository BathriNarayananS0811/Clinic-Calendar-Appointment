import React, { useState } from "react";
import patients from "../data/patients.json";
import doctors from "../data/doctors.json";

const AppointmentForm = ({ date, onClose, onSave }) => {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, patient, doctor, time });
    onClose();
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h3>New Appointment - {date}</h3>
      <select value={patient} onChange={(e) => setPatient(e.target.value)} required>
        <option value="">Select Patient</option>
        {patients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
      </select>
      <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
        <option value="">Select Doctor</option>
        {doctors.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
      </select>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AppointmentForm;
