import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import QuestionBank from "./pages/QuestionBank/QuestionBank";
import MCQSBank from "./pages/MCQsBank/MCQsBank";
import CreateQuestion from "./pages/QuestionBank/QuestionCreater";
import PaperMaking from "./pages/Teacher/PaperMaking";
import PaperInfo from "./pages/home/paperInfo";
import PaperView from "./pages/Paper/PaperView";
import PaperApprove from "./pages/Paper/PaperApprove";
import Login from "./pages/login/Login";
import MCQCreater from "./pages/MCQsBank/MCQCreater";
import PaperEditing from "./pages/Teacher/PaperEditing";
import { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { SlugProvider } from "./SlugContext";
import { Box } from '@mui/material';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100%',
        overflowX: 'hidden',
        minHeight: '100vh',
        bgcolor: darkMode ? '#121212' : '#f5f5f5'
      }}
      className={darkMode ? "app dark" : "app"}
    >
      <style>
        {`/* Single Line Arrow */
          .ql-chemline {
            display: inline-block;
            position: relative;
            width: 40px;
            height: 0;
            vertical-align: middle;
            margin: 0 4px;
            border-bottom: 2px solid #000000;
          }
          .ql-chemline::after {
            content: "";
            position: absolute;
            right: -1px;
            top: -4px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 7px solid #000000;
          }

          /* Reversible Chemical Line (Double Arrow) */
          .ql-chemreversible {
            display: inline-block;
            position: relative;
            width: 40px;
            height: 10px;
            vertical-align: middle;
            margin: 0 4px;
          }
          .ql-chemreversible .line {
            position: absolute;
            left: 0;
            right: 0;
            border-bottom: 2px solid #000000;
          }
          .ql-chemreversible .line.top {
            top: 0;
          }
          .ql-chemreversible .line.bottom {
            bottom: 0;
          }
          .ql-chemreversible .line.top::after {
            content: "";
            position: absolute;
            right: -1px;
            top: -4px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 7px solid #000000;
          }
          .ql-chemreversible .line.bottom::before {
            content: "";
            position: absolute;
            left: -1px;
            top: -4px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 7px solid #000000;
          }
        `}
      </style>
      <SlugProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <BrowserRouter>
          <Box
            sx={{
              width: '100%',
              mx: 'auto',
              boxSizing: 'border-box'
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/Login" replace />}></Route>
              <Route path="/Home" element={<Home />} />
              <Route path="/MCQSBank" element={<MCQSBank />} />
              <Route path="/QuestionBank" element={<QuestionBank />} />
              <Route path="/CreateQuestion" element={<CreateQuestion />} />
              <Route path="/CreateMCQ" element={<MCQCreater />} />
              <Route path="/PaperMaking" element={<PaperMaking />} />
              <Route path="/PaperEditing" element={<PaperEditing />} />
              <Route path="/Papers" element={<PaperInfo />} />
              <Route path="/PaperView" element={<PaperView />} />
              <Route path="/PaperApprove" element={<PaperApprove />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </SlugProvider>
    </Box>
  );
}

export default App;