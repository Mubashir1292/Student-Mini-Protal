import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./bothstudent.css";

const SurveyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: "Default Name" }; // Provide a default value

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { sname: name, QuestionText: "", Option1: "", Option2: "", Option3: "" },
    ]);
    setShowNextButton(true);
  };

  const updateQuestion = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].QuestionText = text;
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][`Option${optionIndex + 1}`] = text;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    if (updatedQuestions.length === 0) {
      setShowNextButton(false);
    }
  };

  const handleNext = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/Survey/CreateSurvey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questions),
        }
      );

      if (response.ok) {
        console.log("Questions added successfully");
        navigate("/SelectStudent", { state: { name: name } });
      } else {
        const errorData = await response.json();
        console.error("Error adding questions:", errorData);
      }
    } catch (error) {
      console.error("Error adding questions:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Add Questions</h1>
      {questions.map((question, index) => (
        <div key={index} className="questionContainer">
          <input
            type="text"
            className="questionInput"
            placeholder={`Question ${index + 1}`}
            value={question.QuestionText}
            onChange={(e) => updateQuestion(index, e.target.value)}
          />
          <div className="optionsContainer">
            {[1, 2, 3].map((optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                className="optionInput"
                placeholder={`Option ${optionIndex}`}
                value={question[`Option${optionIndex}`]}
                onChange={(e) =>
                  updateOption(index, optionIndex - 1, e.target.value)
                }
              />
            ))}
          </div>
          <button
            className="deleteButton"
            onClick={() => deleteQuestion(index)}
          >
            Delete
          </button>
        </div>
      ))}
      {showNextButton && (
        <button className="nextButton" onClick={handleNext}>
          Next
        </button>
      )}
      <button className="addButton" onClick={addQuestion}>
        <i className="fa fa-plus" aria-hidden="true"></i>
        Add Question
      </button>
    </div>
  );
};

export default SurveyQuestions;
