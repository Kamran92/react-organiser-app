import React from "react";
import classes from "./DayCalendar.module.css"

const DayCalendar = (props) => {
  const {
    arrBeforeDay, arrDay, arrAfterDay,
    joinArr, today, month, ondblclickTd,
    nameKeyTodoList
  } = props;
  const {colorRed, colorSilver, td} = classes;
  const addClass = (arr, clazz) => {
    return arr.map((day) => {
      return (
        <td className={clazz} key={day}>
          {day}
        </td>
      )
    })
  };

  const tdStyles = [colorSilver, td].join(" ");
  const beforeMonth = addClass(arrBeforeDay, tdStyles);
  const afterMonth = addClass(arrAfterDay, tdStyles);

  const checkToday = (day, today, style) => {
    return day === today ? style : null;
  };

  const presentMonth = arrDay.map((day, idx) => {
    const todayColor = checkToday(day, today, colorRed);
    const style = [todayColor, td].join(" ");
    const dataId = `${month}-${day}`;
    nameKeyTodoList.forEach(
      (item) => item === dataId ? day += '"' : day);
    return (
      <td className={style}
          data-id={dataId}
          onDoubleClick={ondblclickTd}
          key={idx}>{day}</td>
    )
  });

  const arrJoin = joinArr(beforeMonth, presentMonth, afterMonth);

  const arr = [];
  if (arrJoin.length > 42) {
    const result = arrJoin.length - 42;
    arrJoin.splice(-result, result)
  }
  for (let i = 0; i < 6; i++) {
    const week = arrJoin.splice(0, 7);
    arr.push(<tr key={i}>{week}</tr>)
  }

  return (
    <tbody>
    {arr}
    </tbody>
  )
};

export default DayCalendar;