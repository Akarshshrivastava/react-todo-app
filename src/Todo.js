import React from "react";
import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { db } from "./firebaseConfig";

const Todo = ({ todo, docId }) => {
  const [editShow, setEditShow] = useState(false);
  const [delShow, setDelShow] = useState(false);

  const [todoName, setTodoName] = useState(todo);
  const [showAlert, setShowAlert] = useState({
    status: false,
    variant: "",
  });
  const [msg, setMsg] = useState("");

  const editTodo = (e) => {
    e.preventDefault();
    db.collection("todos")
      .doc(docId)
      .set({ todo: todoName }, { merge: true })
      .then(() => {
        setEditShow(false);
        setMsg("Todo Edited✨");
        setShowAlert({
          status: true,
          variant: "info",
        });
        setTimeout(() => {
          setShowAlert({
            status: false,
            variant: "",
          });
          setMsg("");
        }, 2000);
      });
  };

  const deleteTodo = (e) => {
    db.collection("todos").doc(docId).delete();
  };

  return (
    <>
      {showAlert.status ? (
        <div className="notify">
          <Alert variant={showAlert.variant}>{msg}</Alert>
        </div>
      ) : (
        <div></div>
      )}
      <div className="todo-card container">
        <div className="todo-item">{todoName}</div>
        <div className="btn-options">
          <button onClick={(e) => setEditShow(true)}>
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={(e) => setDelShow(true)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
        {/* Edit Modal  */}
        <Modal show={editShow} onHide={(e) => setEditShow(false)}>
          <Modal.Header>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>

          <form onSubmit={editTodo}>
            <Modal.Body>
              <Form.Group controlId="Todo">
                <Form.Label>Your Todo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={todoName}
                  value={todoName}
                  onChange={(e) => setTodoName(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => setEditShow(false)}>
                Cancel
              </Button>
              <Button
                disabled={!todoName}
                type="submit"
                variant="primary"
                onClick={editTodo}
              >
                Edit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        {/* Delete Modal  */}
        <Modal show={delShow} onHide={(e) => setDelShow(false)}>
          <Modal.Header>
            <Modal.Title>{todoName}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this todo?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => setDelShow(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteTodo}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Todo;
