const express = require("express");
const route = express.Router();

const { createTodo, updateTodo, getTodo, undoTask, editTask } = require("../controller/todoController");

route.post("/", createTodo)
route.get("/", getTodo)
route.put("/:id", updateTodo);
route.put("/undo/:id", undoTask);
route.put("/edit/:id", editTask);


module.exports = route