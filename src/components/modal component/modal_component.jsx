import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import SAwardlistDataTable from '../datatable/SAwardlistDataTable';
import { useNavigate, useLocation } from 'react-router-dom';
import './modal.scss';
import { awardlistInputs } from '../../formSource';
import { fetchAwardlistRows } from '../../datatablesource';

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const User_Single = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [numbers, setNumbers] = useState('');
  const [inputValues, setInputValues] = useState({
    obtain_number: '', // Initialize with an empty string or default value
    // Add other properties as needed
  });
  const total_marks = useState(localStorage.getItem('total_marks'));
  
  const student_name = useState(localStorage.getItem('student_name_n'));
  let [token] = useState(localStorage.getItem("token"));
  const [isNumberGreaterThanTotal, setIsNumberGreaterThanTotal] = useState(false); // State to track if obtain_number > total_marks

  const redirectToLogin = () => {
      alert("Plaese Login first then you can access this page...");
      window.location.href = '/'; // Replace "/login" with the actual login page path
  };

  useEffect(() => {
    
    const fetchData = async () => {

      const rows = await fetchAwardlistRows();
      console.log('abbassatus', rows.status);
      setStatus(rows.status);
      if (rows.status == 'true'){
 
        setInputValues(rows.data);
        setId(rows.data.id);
      }

    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'obtain_number') {
      const inputNumber = parseInt(value, 10);
      const totalMarks = parseInt(total_marks, 10); // Convert total_marks to integer
  
      if (inputNumber > totalMarks) {
        setIsNumberGreaterThanTotal(true);
      } else {
        setIsNumberGreaterThanTotal(false);
      }
    }
  
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status == 'false'){
      const formData = new FormData();
      formData.append('center_id', localStorage.getItem('center_id'));
      formData.append('examination_id', localStorage.getItem('examination_id'));
      formData.append('student_id', localStorage.getItem('student_id_n'));
      formData.append('user_id', localStorage.getItem('user_id'));
      formData.append('obtain_number', inputValues.number);
      formData.append('status', inputValues.status || 1);
      console.log(formData);
  
  
      // Send formData to the server using an HTTP request to update
      fetch(`http://127.0.0.1:5000/add_awardlist`, {
          method: "POST",
          body: formData, // Pass the object as the body
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              console.log("Response from API", data);
              // Navigate to the desired page after API response
              navigate(`/awardlist`);
          })
          .catch((error) => {
              console.log(error);
          });
  
    }
    else{
      const formData = new FormData();
      formData.append('center_id', localStorage.getItem('center_id'));
      formData.append('examination_id', localStorage.getItem('examination_id'));
      formData.append('student_id', localStorage.getItem('student_id_n'));
      formData.append('user_id', localStorage.getItem('user_id'));
      formData.append('obtain_number', inputValues.number);
      formData.append('status', inputValues.status || 1);
      console.log(formData);
  
  
      // Send formData to the server using an HTTP request to update
      fetch(`http://127.0.0.1:5000/upd_awardlist/${id}`, {
          method: "PUT",
          body: formData, // Pass the object as the body
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              console.log("Response from API", data);
              // Navigate to the desired page after API response
              navigate(`/awardlist`);
          })
          .catch((error) => {
              console.log(error);
          });

    }
};



  const handleClose = () => {
    setOpen(false);
    navigate('/awardlist');
  };

  return (
    <>
      {!token && redirectToLogin()}
     {token && (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <SAwardlistDataTable />
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box className="custom-modal">
              <Typography variant="h5" id="transition-modal-title" sx={{ mt: 2 }}>
                Add {student_name}'s number
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {isNumberGreaterThanTotal && (
                    <span style={{ color: 'red' }}>Your number exceeds the total marks.</span>
                  )}
                  <form onSubmit={handleSubmit}>
                      {awardlistInputs.map((field, index) => (
                        <div key={index}>
                          <label htmlFor={field.name}>{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            name={field.fieldName}
                            value={inputValues[field.fieldName] || ''}
                            onChange={handleInputChange}
                            className={isNumberGreaterThanTotal ? 'inputError' : ''}
                            required
                          />
                        </div>
                      ))}
                      <button type="submit">Submit</button>
                    </form>
                  </Typography>
              </Box>
            </Fade>
          </Modal>

        </div>
      </div>
    </div>
     )
                      }
      </>
  );
};

export default User_Single;
