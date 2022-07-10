import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
let baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";
export const getuser = () => async (dispatch) => {
  try {
    const sid = Cookies.get("connect.sid");
    if (sid) {
      const { data } = await axios.get("/api/users/getuser", {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN", payload: data });
    } else dispatch({ type: "SET_USER_CHECK" });
  } catch (err) {
    dispatch({ type: "SET_USER_CHECK" });
  }
};
export const login = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post(baseURL + "/api/login", values, {
      withCredentials: true,
    });
    axios.defaults.headers.common["Authorization"] = data.token;
    Cookies.set("Authorization", data.token, { path: "/" });
    dispatch({ type: "LOGIN", payload: { name: data.name } });
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const register = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post(baseURL + "/api/register", values, {
      withCredentials: true,
    });
    toast.success("Register successfully");
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const gettop10songs = (values) => async (dispatch) => {
  try {
    const { data } = await axios.get(baseURL + "/api/gettop10songs", {
      withCredentials: true,
    });
    dispatch({ type: "SET_TOP_10_SONGS", payload: data });
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const gettop10artists = (values) => async (dispatch) => {
  try {
    const { data } = await axios.get(baseURL + "/api/gettop10artists", {
      withCredentials: true,
    });
    dispatch({ type: "SET_TOP_10_ARTISTS", payload: data });
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const ratesong = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post(baseURL + "/api/ratesong", values, {
      withCredentials: true,
    });
    toast.success(data);
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
