import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"; // Import the logout icon
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [fullscreen, setFullscreen] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name"));
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleFullscreen = () => {
    console.log(fullscreen);
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    }
  };

  const handleLogout = () => {
    // Clear admin data from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("role_id");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_id");
    // Redirect to login page or home page
    navigate("/login"); // Change this to your desired logout route
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div>
          {/* <input type="text" placeholder="Search..." /> */}
          {/* <SearchOutlinedIcon /> */}
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          {/* <div className="item">
            {darkMode ? (
              <LightModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            ) : (
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            )}
          </div> */}
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" onClick={toggleFullscreen} />
          </div>
          <div className="logo">
            {name}
          </div>
          <div className="item">
            {/* <img
              // src={data.profile_picture}
              alt=""
              className="avatar"
            /> */}
          </div>
          {/* Add the logout button */}
          <div className="item" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <LogoutOutlinedIcon className="icon" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;