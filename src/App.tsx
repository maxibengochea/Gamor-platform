import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/authentication" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
