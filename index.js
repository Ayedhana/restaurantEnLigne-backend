const express = require("express");
const app = express();
require("dotenv").config();
const mongDB=require("./bd");

mongDB()
PORT = process.env.PORT;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next()
});
app.use(express.json());
app.use("/api", require("./Routes/createUser"));
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/OrderData"));
app.get("/", (req, res) => {
  res.send("Hello");
});


  


app.listen(PORT || 5000, () => {
  console.log(`Database connected on ${PORT}`);
});
