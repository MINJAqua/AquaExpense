import axios from "axios";

// const baseUrl =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:8000"
//     : "https://aqua-expenses.herokuapp.com/";

const baseUrl = "https://aqua-expenses.herokuapp.com/";

export default axios.create({
  baseURL: baseUrl,
});
