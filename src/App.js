import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login, Register } from "./pages";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
