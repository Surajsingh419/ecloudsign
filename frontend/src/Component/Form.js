import React, { useState } from "react";
import "./Form.css";
import axios from "axios";

let task = {
  title: null,
  Description: null,
  Status: null,
  ren: 1,
  // isEditable: false
};
const Form = () => {
  //model

  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [data, setData] = useState(task);
  let { ren } = task;

  function onChangeHandel(event) {
    setValue(event.target.value.trim());
  }

  async function allTasks() {
    const allData = await axios.get("/api/task");
    setTodo([...allData.data.data]);
    //   // return allData;
  }
  allTasks();

  async function doneTask(id) {
    const find = todo.find((el) => el._id === id);
    await axios.put(`api/task/${find._id}`);
  }

  async function undoTask(id) {
    const find = todo.find((el) => el._id === id);
    await axios.put(`api/task/undo/${find._id}`);
  }

  async function editTask(id){
    let find = todo.find(elm => elm._id === id)
    find["isEditable"] = true
    setTodo([...todo])
    console.log(todo)
  }

  async function btnVisible() {
    if (ren === 1) {
      if (value === "") return alert("title is required");

      setData((task.title = value));
      setData((task.ren += 1));
    } else if (ren === 2) {
      setData((task.ren += 1));
      setData((task.Description = value));
    } else if (ren === 3) {
      let x = document.getElementById("Status").value;
      setData((task.Status = x));

      await axios.post("/api/task", task);
      setData((task.ren += ren));
    }
  }
  const handelEdit = async ()=>{
    console.log("Edit   hfjshhdknkdnk   ")
    return (<>
      <div className="modal" tabIndex="-1" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary">Save changes</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </>)
  }

  return (
    <div className="main">
      <div className="container">
        <h1>TASK</h1>
        {todo.map(
          (data) =>
            (data.Status === "Open" || data.Status === "In-Progress") && (
              <div className="task">
                <span contentEditable={data.isEditable} className="elem">{data.title.toUpperCase()}</span>
                <span className="elemD">{data.Description.toUpperCase()}</span>
                <button className="compBtn" onClick={() => doneTask(data._id)}>
                  Complete
                </button>
                <button className="compBtn editB" onClick={() => handelEdit()}>Edit</button>
              </div>
            )
        )}
        {/* Form */}
        <form id="form">
          {ren === 1 && (
            <div className="input">
              <input
                id="title"
                className="in"
                type="text"
                placeholder="  Add Task Title Here 📝"
                onChange={onChangeHandel}
              />
              <button className="inBtn" type="submit" onClick={btnVisible}>
                {" "}
                <span className="bn"> Title </span>
              </button>
            </div>
          )}

          {ren === 2 && (
            <div className="input">
              {
                <input
                  id="Description"
                  className="in"
                  type="text"
                  placeholder="  Add Description for task 📝"
                  onChange={onChangeHandel}
                />
              }
              <button className="inBtn" type="submit" onClick={btnVisible}>
                {" "}
                <span className="bn"> Description </span>{" "}
              </button>
            </div>
          )}

          {ren === 3 && (
            <div className="input">
              {
                <select name="task-status" id="Status" className="in">
                  <option value="Open" onChange={onChangeHandel}>
                    Open
                  </option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed"> Completed</option>
                </select>
                /*<input
                  id="Status"
                  className="in"
                  type="text"
                  placeholder=" Status! "
                  onChange={onChangeHandel}
                />*/
              }
              <button className="inBtn" type="submit" onClick={btnVisible}>
                {" "}
                <span className="bn"> submit </span>{" "}
              </button>
            </div>
          )}

          {/*<button id="suBtn" type="submit" >
            <span className="bn"> Submit </span>
          </button>*/}
        </form>
      </div>

      {/* Done Task */}
      <div className="DONE">
        <h1>Done</h1>

        {todo.map(
          (data) =>
            data.Status === "Completed" && (
              <div className="task">
                <span className="elem">{"✅  " + data.title.toUpperCase() }</span>
                <span className="elemD">{data.Description.toUpperCase()}</span>
                <button className="compBtn" onClick={() => undoTask(data._id)}> Undo </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Form;
