import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./eventedit.css";

const EditEvent = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventVenue, setEventVenue] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    console.log("asdasd");
    props.history?.goBack();
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="headerText">Edit Events</h1>
      </div>

      <div className="inputContainer">
        <label className="label">Event Title</label>
        <input
          type="text"
          className="input"
          placeholder="Enter Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <label className="label">Date</label>
        <DatePicker
          selected={eventDate}
          onChange={(date) => setEventDate(date)}
          className="input"
        />
      </div>

      <div className="inputContainer">
        <label className="label">Venue</label>
        <input
          type="text"
          className="input"
          placeholder="Enter Venue"
          value={eventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
        />
      </div>

      <div className="imagePickerContainer">
        <label className="label">Choose Image</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      {selectedImage && (
        <img
          src={selectedImage}
          className="selectedImage"
          alt="Selected Event"
        />
      )}

      <button onClick={handleSave} className="saveButton">
        <span className="buttonText">Save</span>
      </button>
    </div>
  );
};

export default EditEvent;
