const express = require("express");
const router = require("./src/routes/index");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "./assets/uploads")));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
