const res = require("express/lib/response");
const todoModel = require("../model/todoModel");

const GenarateTodo = async (req, res) => {
  try {
    const { body } = req;
    await todoModel.create(body);
    const TODOs = await todoModel.find({
      $or: [{ Status: "Open" }, { Status: "In-Progress" }],
    });
    res
      .status(200)
      .send({ Status: "success", message: "todo created", data: TODOs });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const allTasks = await todoModel.find();
    res.status(200).send({ data: allTasks });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    await todoModel.findOneAndUpdate(
      { _id: id },
      { Status: "Completed" },
      { new: true }
    );
    const doneTasks = await todoModel.find({ Status: "Completed" });

    res
      .status(200)
      .send({ status: "DONE", message: "task Completed", data: doneTasks });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const undoTask = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    await todoModel.findOneAndUpdate(
      { _id: id },
      { Status: "Open" },
      { new: true }
    );
    const doneTasks = await todoModel.find({ Status: "Open" });

    res
      .status(200)
      .send({ status: "DONE", message: "task Completed", data: doneTasks });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const { title, Description, Status } = body;

    await todoModel.findOneAndUpdate(
      { _id: id },
      body,
      { new: true }
    );
    const doneTasks = await todoModel.find({ Status: "Open" });

    res
      .status(200)
      .send({ status: "DONE", message: "task Completed", data: doneTasks });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { GenarateTodo, updateTodo, getTodo, undoTask, editTask };
