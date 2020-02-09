import React from "react";
import DayCalendar from "./DayCalendar/DayCalendar";

const Calendar = (props) => {
  return (
    <table>
      <thead>
      <tr>
        <th>Пн</th>
        <th>Вт</th>
        <th>Ср</th>
        <th>Чт</th>
        <th>Пт</th>
        <th>Сб</th>
        <th>Вс</th>
      </tr>
      </thead>
      <DayCalendar {...props}/>
    </table>
  )
};

export default Calendar;