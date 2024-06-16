import React, { useState } from "react";
import "./adminlogin.css";
import userprofile from "../../../assets/userprofile.png";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/miniportal/Adminlogin?username=${username}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message === "Login successful") {
        navigate("/AdminDashboard");
        localStorage.setItem("admin", JSON.stringify(data));
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.log("Error occurred:", error);
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AdmnloginPage__mainContainer">
      <div className="AdmnloginPage__container">
        <img className="AdmnloginPage__logo" alt="" src={userprofile} />
        <div className="AdmnloginPage__heading">
          <h1>Admin Login</h1>
        </div>
        <div className="AdmnloginPage__input">
          <form className="Admnlogin__form" onSubmit={handleLogin}>
            <input
              className="Admnmy-input"
              placeholder="Admin"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              className="Admnmy-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <div>
              <button className="adminbtn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
