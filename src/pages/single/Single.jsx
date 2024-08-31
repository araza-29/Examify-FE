import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const Single = () => {
  // Extracting categoryId using regular expressions
  const location = useLocation();
  const categoryId = location.pathname.match(/\/categories\/(\d+)/)?.[1]; 
  
  const [category, setCategory] = useState(null);
  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Plaese Login first then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };

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
        setCategory(data);
        localStorage.setItem("categoryData", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    };
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  return (
    <>
      {!token && redirectToLogin()}
      {token && (
        <div className="single">
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
            <div className="top">
              <div className="left">
                <div className="editButton">
                  <Link to={`/examination/update/${categoryId}`} className=" link">
                    Edit
                  </Link>
                </div>
                <h1 className="title">Exam Information</h1>
                <div className="item">
                  <img src={
                    category?.data[0].category_picture
                    } 
                    alt="" 
                    className="itemImg" 
                  />
                  <div className="details">
                    <h1 className="itemTitle">{category?.data[0].category_name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Id:</span>
                      <span className="itemValue">{category?.data[0].id}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Number of quiz:</span>
                      <span className="itemValue">{category?.data[0].no_of_quiz}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">{category?.data[0].status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div>
        )
      }
    </>
  );
};

export default Single;