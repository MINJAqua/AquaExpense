const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

connectDB();

const app = express();
const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
