import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [fullscreen, setFullscreen] = useState(false);
  // let [data] = useState(JSON.parse(localStorage.getItem("adminData"))); // Parse the data string into an object

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
            {/* {data.name} */}
            Abbas
          </div>
          <div className="item">
            {/* <img
              // src={data.profile_picture}
              alt=""
              className="avatar"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
