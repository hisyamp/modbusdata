const express = require("express");
const userRoutes = require("./routes/userRoutes");
const modbusRoutes = require("./routes/modbusRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON requests

app.use("/api", modbusRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
