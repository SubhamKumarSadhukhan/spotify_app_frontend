import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getuser } from "./redux/actions/userAction";
import { Login, Register, Home, AddSong } from "./pages";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authenticated);
  const check = useSelector((state) => state.check);
  useEffect(() => {
    dispatch(getuser());
  }, []);
  if (!check)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  else
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
              path="/addsong"
              element={auth ? <AddSong /> : <Navigate to="/" />}
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
