import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryInputs } from "../../formSource";


const Update = ({ title }) => {

  // Extracting categoryId using regular expressions
  const location = useLocation();
  const categoryId = location.pathname.match(/\/categories\/update\/(\d+)/)?.[1]; 

  // Initializing state
  const [file, setFile] = useState(null); 
  const [inputValues, setInputValues] = useState("");
  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Plaese Login first then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/admin/categorybyid/${categoryId}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
        const data = await response.json();
        setInputValues(data.data[0]);
        setFile(data.data[0].category_picture);
        localStorage.setItem("categoryData", JSON.stringify(data));

      } catch (error) {
        console.error(error);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);
  console.log("category in a state:", file);
  
  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      category_id: categoryId,
      category_name: inputValues.category_name,
      no_of_quiz: parseInt(inputValues.no_of_quiz),
      // category_picture: file ? URL.createObjectURL(file) : "",
      category_picture: file || "",
    };

    // Send formData to the server using an HTTP request to update
    fetch("/api/admin/updatecategory", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Pass the object as the body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Response from API", data);
        // Navigate to the desired page after API response
        navigate(`/categories/${categoryId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
     <>
      {!token && redirectToLogin()}
      {token && (
        <div className="update">
          <Sidebar />
          <div className="updateContainer">
            <Navbar />
            <div className="top">
              <h1>{title}</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    file
                  }
                  alt=""
                  className="itemImg"
                />
              </div>
              <div className="right">
                <form onSubmit={handleUpdate}>
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
                        name={input.fieldName}
                        value={inputValues[input.fieldName] || ''}
                        onChange={handleInputChange}
                        required
                        inputMode={input.fieldName === 'no_of_quiz' ? 'numeric' : undefined}
                      />
                    </div>
                  ))}
                  <div style={{ clear: "both" }} className="formUpdate">
                    <button 
                    style={{ float: "right" }}
                    // onClick={() => navigate(`/categories/${categoryId}`)}
                    >
                      Update
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      style={{ float: "right" }}
                      onClick={() => navigate(`/categories/${categoryId}`)}
                    >
                      Cancel
                    </button>
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

export default Update;