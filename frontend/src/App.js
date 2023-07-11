//import logo from './logo.svg';
//import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/Navbar";
import React, { Fragment, useState, useEffect } from "react";

import { AiFillDelete } from "react-icons/ai";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [btnName, setBtnName] = useState("Add New Todo");
  const [allTodo, setAllTodo] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    //console.log(todo);

    setAllTodo([...allTodo, { id: nanoid(), todo: todo }]);

    Swal.fire(
      "Todo Inserted!",
      "Todo has been inserted successfully.",
      "success"
    );
    setTodo("");
  };

  const deleteTodo = (id) => {
    //console.log('deleted id: ', id);
    setAllTodo((todo) => todo.filter((entry) => entry.id !== id));
    toast("Todo has been deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      type: "error",
    });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div>
          <div className="col-md-6 offset-md-3">
            <h3 className="mt-5">React Todo App</h3>

            <form onSubmit={addTodo}>
              <input
                type="text"
                className="form-control"
                value={todo}
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
                placeholder="Enter Todo"
                name="todo"
                required
              />
              <br />
              <button className="btn btn-primary btn-sm" type="submit">
                {btnName}
              </button>
            </form>

            <br />
            <br />
            <h4 className="text-danger">
              {allTodo.length > 0
                ? "Total Todos : " + allTodo.length
                : "No any todos"}
            </h4>
            <div
              className="alert alert-info text-center"
              style={{ padding: "7px" }}
              role="alert"
            >
              {allTodo.length > 0 ? "All todos are showing." : "No Todo"}
            </div>

            <table className="table table-striped table-hover">
              <thead>
                <tr className="table-dark">
                  <th>S #</th>
                  <th>ID</th>
                  <th>Todo</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {allTodo.map((todos, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{ind + 1}</td>
                      <td>{todos.id}</td>
                      <td>{todos.todo}</td>
                      <td>
                        <AiFillDelete
                          color="#e74c3c"
                          onClick={() => deleteTodo(todos.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Fragment>
  );
}

export default App;
