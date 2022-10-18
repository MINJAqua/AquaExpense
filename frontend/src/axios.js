import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default axios.create({
  baseURL: baseUrl,
});
