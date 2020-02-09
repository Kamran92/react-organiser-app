import React from "react";
import AddItemButton from "./AddItemButton/AddItemButton";
import classes from "./TodoList.module.css"

const TodoList = (props) => {
  const {
    dataTodoList, attributeDataId,
    onAddTodoItem, onDeleteTodoItem,
    toggle
  } = props;
  let arr;
  if (attributeDataId !== null) {
    const idx = dataTodoList.findIndex(({dataId}) => dataId === attributeDataId);
    if (idx !== -1) {
      arr = dataTodoList[idx].todoList.map(({id, value}) => {
        return (
          <li key={id}>
            {value}
            <button onClick={() => onDeleteTodoItem(id)}>-</button>
          </li>
        )
      })
    }
    if (idx === -1) {
      arr = <div>Задач пока нет</div>
    }
  }
  const input = toggle ?
    <AddItemButton onAddTodoItem={onAddTodoItem}/> : null;
  const {ol} = classes;
  return (

    <div>
      {input}
      <ol className={ol}>
        {arr}
      </ol>
    </div>
  )
};

export default TodoList;