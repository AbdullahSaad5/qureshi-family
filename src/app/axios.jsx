import axios from "axios";

const API = axios.create({
  baseURL: "https://quresh-family-5b06b2823b36.herokuapp.com/api",
});

export default API;

