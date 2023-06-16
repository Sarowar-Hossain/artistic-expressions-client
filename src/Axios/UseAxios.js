import axios from "axios";

const AXIOS = axios.create({
  baseURL: "https://assignmentserver-nine.vercel.app",
});

AXIOS.interceptors.request.use((request) => {
  request.headers.Authorization = `bearer ${localStorage.getItem(
    "access-token"
  )}`;
  console.log("interceptors request:", request);

  return request;
});

AXIOS.interceptors.response.use((response) => {
  console.log("interceptors response:", response);

  return response;
});

export default AXIOS;
