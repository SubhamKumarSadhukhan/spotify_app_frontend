import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Login, Register, Home } from "./pages";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const auth = useSelector((state) => state.authenticated);
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={auth ? <Home /> : <Navigate to="/register" />}
          ></Route>
          <Route
            exact
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
