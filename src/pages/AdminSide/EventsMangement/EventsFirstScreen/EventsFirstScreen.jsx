import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./eventsfirstscreen.css";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";

const Event = () => {
  const location = useLocation();
  const { data } = location.state || { data: [] };
  const navigate = useNavigate();
  const [AddSelectEvent, setAddSelectEvent] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [events, setEvents] = useState(data || []);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState(new Date());
  const [newEventVenue, setNewEventVenue] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventImage, setNewEventImage] = useState(null);

  const renderEventItem = (item) => {
    return (
      <>
        {!AddSelectEvent ? (
          <>
            <div className="eventItem" key={item.id}>
              <img src={item.image.name} alt="Event" className="eventImage" />
              <div className="eventDetails">
                {/* <h3 className="eventTitle">{item.title}</h3>
          <p className="eventDate">{item.event_date}</p>
          <p className="eventVenue">{item.venue}</p>
          <p className="eventDescription">{item.description}</p> */}
              </div>
              {/* <button
          className="editButton"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/EventEdit", { state: { event: item } });
          }}
        >
          <MdEdit size={24} color="#0088B4" />
        </button> */}
              <button
                className="deleteButton"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MdDelete size={24} color="white" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div></div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Posting Event</h2>
      </div>
      <div className="eventList">
        {events?.map((item) => renderEventItem(item))}
      </div>
      <div className="addEventForm">
        <input
          type="text"
          placeholder="Event Title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          className="input"
        />
        <DatePicker
          selected={newEventDate}
          onChange={(date) => setNewEventDate(date)}
          className="input"
        />
        <input
          type="text"
          placeholder="Venue"
          value={newEventVenue}
          onChange={(e) => setNewEventVenue(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
          className="input description"
        />
        <input
          type="file"
          onChange={(e) => setNewEventImage(e.target.files[0])}
          className="input"
        />
        <button className="addButton">Add Event</button>
      </div>
      {/* {selectedImage && (
        <div className="modalContainer" onClick={handleCloseModal}>
          <button className="closeButton">
            <MdClose size={30} color="white" />
          </button>
          <img src={selectedImage} alt="Selected" className="modalImage" />
        </div>
      )} */}
    </div>
  );
};

export default Event;
