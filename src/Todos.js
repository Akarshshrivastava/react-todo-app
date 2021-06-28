import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { Alert } from "react-bootstrap";
import Todo from "./Todo";

function Todos() {
  // todos array consists of todo field and its document id.
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div className="all-todos container">
      {todos.length === 0 ? (
        <Alert
          variant="success"
          className="d-flex justify-content-center align-items-center"
        >
          You have no tasks left🎉
        </Alert>
      ) : (
        <div>
          {todos.map(({ id, data }) => (
            <Todo docId={id} key={id} todo={data.todo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
