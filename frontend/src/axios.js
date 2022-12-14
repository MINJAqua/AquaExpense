import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

export default axios.create({
  baseURL: baseUrl,
});
