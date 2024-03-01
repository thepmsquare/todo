"use client";

import { FormEvent, useState } from "react";
import styles from "./stylesheets/page.module.css";

export default function Home() {
  // state
  const [todos, changeTodos] = useState([]);
  const [inputVal, changeInputVal] = useState("");
  const [editState, changeEditState] = useState({ bool: false, idx: 0 });
  const [editInputVal, changeEditInputVal] = useState("");

  //functions
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    changeTodos((oldTodos) => {
      let newTodos = JSON.parse(JSON.stringify(oldTodos));
      newTodos.push(inputVal);
      return newTodos;
    });
    changeInputVal("");
  };

  const handleDelete = (index: number) => {
    changeTodos((oldTodos) => {
      let newTodos = JSON.parse(JSON.stringify(oldTodos));
      newTodos.splice(index, 1);

      return newTodos;
    });
  };

  const handleEdit = (idx: number) => {
    changeEditState({ bool: true, idx: idx });
    changeEditInputVal(todos[idx]);
  };

  const handleEditCancel = (idx: number) => {
    changeEditState({ bool: false, idx: 0 });
  };
  const handleEditFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    changeTodos((oldTodos) => {
      let newTodos = JSON.parse(JSON.stringify(oldTodos));
      newTodos[editState.idx] = editInputVal;
      return newTodos;
    });
    changeEditState({ bool: false, idx: 0 });
  };
  return (
    <main className={styles.main}>
      <form onSubmit={handleFormSubmit}>
        <input
          value={inputVal}
          onChange={(e) => changeInputVal(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>

      {todos.map((todo, idx) => {
        return (
          <div key={idx}>
            {editState.bool && editState.idx === idx ? (
              <form onSubmit={handleEditFormSubmit}>
                <input
                  value={editInputVal}
                  onChange={(e) => changeEditInputVal(e.target.value)}
                />
                <input type="submit" value="submit" />
                <button onClick={() => handleEditCancel(idx)}>cancel</button>
              </form>
            ) : (
              <>
                {todo}
                <button onClick={() => handleEdit(idx)}>edit</button>
                <button onClick={() => handleDelete(idx)}>delete</button>
              </>
            )}
          </div>
        );
      })}
    </main>
  );
}
