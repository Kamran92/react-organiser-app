import React from "react";
import classes from "./NavigationButton.module.css"

const NavigationButton = (props) => {
  const {
    onPrevMonth, onNextMonth,
    year, month, nameMonths
  } = props;
  const {titleH4}= classes;

  return (
    <div>
      <h4 className={titleH4}>{`${nameMonths[month]} ${year} г.`}</h4>
      <button onClick={onPrevMonth}>Назад</button>
      <button onClick={onNextMonth}>Вперед</button>
    </div>
  )
};

export default NavigationButton;