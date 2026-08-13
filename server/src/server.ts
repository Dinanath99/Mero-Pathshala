import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
