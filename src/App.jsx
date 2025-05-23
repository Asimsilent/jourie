import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Test from "./pages/Test";
import Questions from "./pages/Questions";
import Win from "./pages/Win";
import Letters from "./ui/Letters";
import { useState } from "react";

function App() {
  const [letter, setLetter] = useState();

  return (
    <div className="position-relative ">
      <BrowserRouter>
        <Letters Letter={letter} setLetter={setLetter} />

        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="homepage" />} />
            <Route path="homepage" element={<Homepage Letter={letter} />} />
            <Route path="test" element={<Test />} />
            <Route path="questions" element={<Questions />} />
            <Route path="win" element={<Win />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
