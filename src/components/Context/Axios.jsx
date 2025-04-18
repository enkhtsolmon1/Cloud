import axios from "axios";

const instance = axios.create({
  baseURL: "http://west.edu.mn:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
