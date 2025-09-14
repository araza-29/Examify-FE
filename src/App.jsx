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
        bgcolor: darkMode ? '#121212' : '#f5f5f5',
        '& chemical-line[data-chemical-type="single"]': {
          display: 'inline-block !important',
          position: 'relative !important',
          width: '40px !important',
          height: '0 !important',
          verticalAlign: 'middle !important',
          margin: '0 4px !important',
          borderBottom: '2px solid #000000 !important',
          background: 'transparent !important',
        },
        '& chemical-line[data-chemical-type="single"] span[data-arrow-head="single"]': {
          position: 'absolute !important',
          right: '-1px !important',
          top: '-4px !important',
          width: '0 !important',
          height: '0 !important',
          borderTop: '5px solid transparent !important',
          borderBottom: '5px solid transparent !important',
          borderLeft: '7px solid #000000 !important',
          display: 'block !important',
        },
        '& chemical-reversible': {
          display: 'inline-block !important',
          position: 'relative !important',
          width: '40px !important',
          height: '10px !important',
          verticalAlign: 'middle !important',
          margin: '0 4px !important',
        }
      }}
      className={darkMode ? "app dark" : "app"}
    >
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