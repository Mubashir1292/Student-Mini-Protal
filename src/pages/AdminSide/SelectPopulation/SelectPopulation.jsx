import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./selectpopulation.css";
import axios from "axios";

const SelectPopulation = () => {
  const [entries, setEntries] = useState([]);
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState([]);
  const [semester, setSemester] = useState([]);
  const [section, setSection] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (event, setState, state) => {
    const value = event.target.value;
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleAddNew = () => {
    const newEntry = { gender, degree, semester, section };
    setEntries([...entries, newEntry]);
    // Clear form fields
    setGender("");
    setDegree([]);
    setSemester([]);
    setSection([]);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSaveAndBack = () => {
    // Handle save logic here
    console.log("Saved entries:", entries);

    // Save entries to local storage or backend
    localStorage.setItem("savedEntries", JSON.stringify(entries));

    handleNext();

    // Navigate back to the previous screen or a specific route
    navigate(-1); // -1 goes back to the previous page
  };

  const handleNext = async () => {
    const data = [
      {
        surveyId: 1,
        gender: gender,
        degree: degree,
        semester: semester,
        section: section,
      },
    ];

    try {
      const response = await axios.post(
        "http://localhost/studentminiportal/api/Survey/SurveyCurrentStudent",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data, "data");
      if (response.status === 200) {
        console.log("Entries added successfully");
        navigate("/SelectStudent");
      } else {
        console.error("Error adding Entries:", response.data);
      }
    } catch (error) {
      console.error("Error adding Entries:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Select Population</h1>
      <div className="form-group">
        <label>Gender</label>
        <div className="gender-buttons">
          <button
            onClick={() => setGender("male")}
            className={gender === "male" ? "active" : ""}
          >
            Male
          </button>
          <button
            onClick={() => setGender("female")}
            className={gender === "female" ? "active" : ""}
          >
            Female
          </button>
        </div>
      </div>
      <div className="form-group">
        <label>Degree</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              value="BSAI"
              checked={degree.includes("BSAI")}
              onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
            />
            BSAI
          </label>
          <label>
            <input
              type="checkbox"
              value="BSCS"
              checked={degree.includes("BSCS")}
              onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
            />
            BSCS
          </label>
          <label>
            <input
              type="checkbox"
              value="BSIT"
              checked={degree.includes("BSIT")}
              onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
            />
            BSIT
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Semester</label>
        <div className="checkbox-group">
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
            <label key={sem}>
              <input
                type="checkbox"
                value={sem}
                checked={semester.includes(sem)}
                onChange={(e) => handleCheckboxChange(e, setSemester, semester)}
              />
              {sem}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Section</label>
        <div className="checkbox-group">
          {["A", "B", "C", "D"].map((sec) => (
            <label key={sec}>
              <input
                type="checkbox"
                value={sec}
                checked={section.includes(sec)}
                onChange={(e) => handleCheckboxChange(e, setSection, section)}
              />
              {sec}
            </label>
          ))}
        </div>
      </div>
      <div className="entry-list">
        {entries.map((entry, index) => (
          <div key={index} className="entry-item">
            <p>
              Gender: {entry.gender}, Degree: {entry.degree.join(", ")},
              Semester: {entry.semester.join(", ")}, Section:{" "}
              {entry.section.join(", ")}
            </p>
            <button
              onClick={() => handleDelete(index)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="button-group">
        <button onClick={handleAddNew} className="add-button">
          Add New
        </button>
        <button onClick={handleSaveAndBack} className="save-button">
          Save & Back
        </button>
      </div>
    </div>
  );
};

export default SelectPopulation;
