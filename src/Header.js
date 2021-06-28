import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { db } from "./firebaseConfig";
import firebase from "firebase";

function Header() {
  const [input, setInput] = useState("");
  const [showAlert, setShowAlert] = useState({
    status: false,
    variant: "",
  });
  const [msg, setMsg] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos")
      .add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setInput("");
        setMsg("Todo Added✔");
        setShowAlert({
          status: true,
          variant: "success",
        });
        setTimeout(() => {
          setShowAlert({
            status: false,
            variant: "",
          });
          setMsg("");
        }, 2000);
      })
      .catch((err) => {
        setMsg("Error: " + err);
        setShowAlert({
          status: true,
          variant: "danger",
        });
        setTimeout(() => {
          setShowAlert({
            status: false,
            variant: "",
          });
          setMsg("");
        }, 5000);
      });
  };

  return (
    <div className="header container">
      <h1>My Todo App🔥</h1>
      <form className="todo-input">
        <Form.Group
          className="d-flex justify-content-center align-items-center"
          controlId="todoInput"
        >
          <Form.Control
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Todo"
          />
        </Form.Group>
        <Button
          disabled={!input}
          variant="primary"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>
      {showAlert.status ? (
        <div>
          <Alert variant={showAlert.variant}>{msg}</Alert>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Header;
