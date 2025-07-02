import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { WalletOutlined } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import BatchPredictionOutlinedIcon from "@mui/icons-material/BatchPredictionOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { CheckCircleOutline } from '@mui/icons-material';
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import FiberSmartRecordOutlinedIcon from "@mui/icons-material/FiberSmartRecordOutlined";
import ScreenLockLandscapeOutlinedIcon from "@mui/icons-material/ScreenLockLandscapeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useSlug } from "../../SlugContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
   const { slugs } = useSlug();
  console.log("slugs abbas",slugs)
  const linkStrings = {
    "/user": "User-Listing",
    "/coo": "Coo-Listing",
    "/center": "Center-Listing",
    "/account": "Account-Listing",
    "/expense": "Expense-Listing",
    "/batch": "Batch-Listing",
    "/group": "Group-Listing",
    "/class": "Class-Listing",
    "/time-table": "Timetable-Listing",
    "/teacher-attendance": "Teacherattendance-Listing",
    "/duty": "Duty-Listing",
    "/student": "Student-Listing",
    "/subject": "Subject-Listing",
    "/teacher": "Teacher-Listing",   
    "/role": "Userrole-Listing",
    "/role-screen": "Rolescreen-Listing",
    "/examination": "Examination-Listing",
  };
  
  const isLinkEnabled = (path) => {
    const assignedString = linkStrings[path];
    return slugs.includes(assignedString);
  };


  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Center Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>
         
          <p className="title">LISTS</p>
          <Link to="/questionbank" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Question Bank</span>
            </li> 
          </Link>
          <Link to="/MCQSBank" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>MCQS Bank</span>
            </li> 
          </Link>
          {/*
            <Link to="/coo" style={{ textDecoration: "none" }}>
              <li style={{ display: isLinkEnabled("/coo") ? "block" : "none" }}>
                <PersonOutlineIcon className="icon" />
                <span>COO</span>
              </li>
            </Link>

          <Link to="/center" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/center") ? "block" : "none" }}>
              <CenterFocusStrongOutlinedIcon Icon className="icon" />
              <span>Center</span>
            </li> 
          </Link>    

        <Link to="/account" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/account") ? "block" : "none" }}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Account</span>
            </li> 
          </Link>
          <Link to="/expense" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/account") ? "block" : "none" }}>
              <WalletOutlined className="icon" />
              <span>Expense</span>
            </li> 
          </Link>
          <Link to="/batch" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/batch") ? "block" : "none" }}>
              <BatchPredictionOutlinedIcon className="icon" />
              <span>Batch</span>
            </li>
          </Link>
          <Link to="/group" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/group") ? "block" : "none" }}>
              <GroupIcon className="icon" />
              <span>Group</span>
            </li>
          </Link>
          <Link to="/class" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/class") ? "block" : "none" }}>
              <ClassOutlinedIcon className="icon" />
              <span>Class</span>
            </li>
          </Link>
          <Link to="/time-table" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/time-table") ? "block" : "none" }}>
              <AccessTimeIcon className="icon" />
              <span>Time Table</span>
            </li>
          </Link>
          <Link to="/teacher-attendance" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/teacher-attendance") ? "block" : "none" }}>
              <CheckCircleOutline className="icon" />
              <span>Teacher Attendance</span>
            </li>
          </Link>
          <Link to="/duty" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/duty") ? "block" : "none" }}>
              <WorkOutlinedIcon className="icon" />
              <span>Duty</span>
            </li>
          </Link>
          <Link to="/student" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/student") ? "block" : "none" }}>
              <ChildCareOutlinedIcon className="icon" />
              <span>Student</span>
            </li>
          </Link>
          <Link to="/subject" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/subject") ? "block" : "none" }}>
              <SubjectOutlinedIcon className="icon" />
              <span>Subject</span>
            </li>
          </Link>
          <Link to="/teacher" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/teacher") ? "block" : "none" }}>
              <PersonOutlineIcon className="icon" />
              <span>Teacher</span>
            </li>
          </Link>
          <Link to="/result/new" style={{ textDecoration: "none" }}>
            <li >
              <PercentOutlinedIcon className="icon" />
              <span>Subject Result</span>
            </li>
          </Link>     
            <Link to="/role" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/role") ? "block" : "none" }} >
              <RocketLaunchOutlinedIcon className="icon" />
              <span>User Role</span>
            </li>
          </Link>

          <Link to="/srecord" style={{ textDecoration: "none" }}>
            <li >
              <FiberSmartRecordOutlinedIcon  className="icon" />
              <span>Student Record</span>
            </li>
          </Link>
          <Link to="/role-screen" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/role-screen") ? "block" : "none" }} >
              <ScreenLockLandscapeOutlinedIcon  className="icon" />
              <span>Role Screen</span>
            </li>
          </Link>
          <Link to="/examination" style={{ textDecoration: "none" }}>
            <li style={{ display: isLinkEnabled("/examination") ? "block" : "none" }}>
              <CheckCircleOutlineOutlinedIcon  className="icon" />
              <span>Examination</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={() => { localStorage.removeItem("token") }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </Link> */}
          {/* </li> */}
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
