import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import QuestionBank from "./pages/QuestionBank/QuestionBank";
import MCQSBank from "./pages/MCQsBank/MCQsBank";
import CreateQuestion from "./pages/QuestionBank/QuestionCreater";
import PaperMaking from "./pages/Teacher/PaperMaking";
import PaperInfo from "./pages/home/paperInfo"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { SlugProvider } from "./SlugContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <SlugProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MCQSBank" element={<MCQSBank />} />
            <Route path="/QuestionBank" element={<QuestionBank />} />
            <Route path="/CreateQuestion" element={<CreateQuestion />} />
            <Route path="/PaperMaking" element={<PaperMaking />} />
            <Route path="/Papers" element={<PaperInfo />} />
          </Routes>
        </BrowserRouter>
      </SlugProvider>
    </div>
  );
}

export default App;
