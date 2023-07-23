import { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      todoList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://127.0.0.1:8000/api/tasks/${item.id}`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/tasks/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${item.id}`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({
      activeItem: item,
      model: !this.state.modal,
    });
  };

  displacyCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displacyCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
        </span>
        <span
          onClick={() => this.displacyCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );
    console.log(newItems);
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button className="btn btn-info mr-2">Edit</button>
          <button className="btn btn-danger mr-2">Delete</button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-black text-uppercase text-center my-4">
          Task Manager
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button onClick={this.createItem} className="btn btn-primary">
                  Add Task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-3 mb-2 bg-info text-white text-center">
          Copyright 2023 &copy; All rights Reversed
        </footer>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          ></Modal>
        ) : null}
      </main>
    );
  }
}

export default App;
