const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const app = express();

const router = require("./router/route");

dotEnv.config({ path: `${__dirname}/../config.env` });

app.use(express.json());

console.log(process.env.DATABASE);
const DB = process.env.DATABASE || "mongodb://localhost:27017/todoApp";
mongoose.connect(DB).then(() => {
  console.log("MONGODB Connection success...");
});

app.use("/api/task", router)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
