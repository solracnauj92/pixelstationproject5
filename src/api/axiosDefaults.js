import axios from "axios";

axios.defaults.baseURL = "https://pixelstationproject5-api-1a9dadf46f0b.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();