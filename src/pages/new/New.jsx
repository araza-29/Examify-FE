import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { categoryInputs } from "../../formSource";

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [inputValues, setInputValues] = useState({});
  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Plaese Login first then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      category_name: inputValues.catagoryname,
      no_of_quiz: parseInt(inputValues.numberofquiz),
      category_picture: file ? URL.createObjectURL(file) : "",
    };
  
    // Convert formData to a JSON string
    const formDataString = JSON.stringify(formData);
  
    // Store formDataString in local storage
    localStorage.setItem("formData", formDataString);
  
    // Send formData to the server using an HTTP request
    fetch("/api/admin/addcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataString,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Response from API", data);
      })
      .catch((error) => {
        console.log(error);
      });
  
    // Reset the form
    setFile("");
    setInputValues({});
  };  

  return (
     <>
      {!token && redirectToLogin()}
      {token && (
        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>{title}</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form onSubmit={handleSubmit}>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                  {categoryInputs.map((input) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.label.toLowerCase().split(" ").join("")}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ))}
                  <div style={{ clear: "both" }} className="formSubmit">
                    <button type="submit" style={{ float: "right" }}>Send</button>
                  </div>  
                </form>
              </div>
            </div>
          </div>
        </div>
        )
      }
    </>
  );
};

export default New;