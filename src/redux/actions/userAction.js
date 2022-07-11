import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
let baseURL = process.env.REACT_APP_BASE_URL; 
export const getuser = () => async (dispatch) => {
  try {
    console.log("lol");
    const token = Cookies.get("Authorization");
    const decoded = jwt_decode(token, { complete: true });
    console.log(decoded);
    if (Date.now() <= decoded.exp * 1000) {
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const { data } = await axios.get(baseURL + "/api/getuser", {});
        axios.defaults.headers.common["Authorization"] = data.token;
        Cookies.set("Authorization", data.token, { path: "/" });
        dispatch({ type: "LOGIN", payload: { name: decoded.name } });
      } catch (e) {
        dispatch({ type: "LOGOUT" });
      }
    } else {
      dispatch({ type: "SET_USER_CHECK" });
    }
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
    await axios.post(baseURL + "/api/register", values, {
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
export const gettop10artists = () => async (dispatch) => {
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
    console.log("values");
    const { data } = await axios.post(baseURL + "/api/ratesong", values, {
      withCredentials: true,
    });
    toast.success(data);
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const getartists = () => async (dispatch) => {
  try {
    const { data } = await axios.get(baseURL + "/api/getartists", {
      withCredentials: true,
    });
    dispatch({ type: "SET_ARTISTS", payload: data });
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const addsong = (values) => async (dispatch) => {
  try {
    console.log("values");
    const { data } = await axios.post(baseURL + "/api/addsong", values, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success(data);
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const addartist = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post(baseURL + "/api/addartist", values, {
      withCredentials: true,
    });
    dispatch(getartists());
    toast.success(data);
  } catch (error) {
    console.log(error.message);
    toast.error(error.response && error.response.data);
  }
};