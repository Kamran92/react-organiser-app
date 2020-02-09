import React, {Fragment} from "react";

const AddItemButton = (props) => {
  const {onAddTodoItem} = props;
  return (
    <Fragment>
      <input type="text"/>
      <button onClick={onAddTodoItem}>+</button>
    </Fragment>
  )
};

export default AddItemButton;