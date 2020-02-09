import React, {Fragment} from "react";
import Time from "./Time/Time";
import classes from "./DateToday.module.css"

const DateToday = (props) => {
  const {date, nameMonths, time} = props;
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const {titleH3}=classes;

  return (
    <Fragment>
      <Time time={time}/>
      <h3 className={titleH3}>{`${day} ${nameMonths[month]} ${year} г.`}</h3>
    </Fragment>
  )
};

export default DateToday;