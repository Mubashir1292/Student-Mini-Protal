import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./eventshistory.css";

const ViewResults = () => {
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [isViewingResults, setIsViewingResults] = useState(false);
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedSurvey(event.target.value);
  };

  const handleViewResults = () => {
    if (selectedSurvey) {
      setIsViewingResults(true);
    } else {
      alert("Please select a survey.");
    }
  };

  const handleEdit = () => {
    setIsViewingResults(false);
  };

  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>
          &larr;
        </button>
        <h2>View Results</h2>
      </div>
      <div className="content">
        <h3>Select Survey to View Results</h3>
        {!isViewingResults ? (
          <div className="form-group">
            <label htmlFor="surveySelect">Select Survey</label>
            <select
              id="surveySelect"
              value={selectedSurvey}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select Survey
              </option>
              <option value="Job Survey (2024-05-01)">
                Job Survey (2024-05-01)
              </option>
              <option value="Event Feedback (2024-04-15)">
                Event Feedback (2024-04-15)
              </option>
            </select>
            <button className="view-results-button" onClick={handleViewResults}>
              View Results
            </button>
          </div>
        ) : (
          <div>
            <h4>Selected Survey: {selectedSurvey}</h4>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResults;
