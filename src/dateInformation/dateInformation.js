const date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth(),
  day = date.getDate(),
  week = date.getDay(),
  time = date.toLocaleTimeString();

const arrDay = (year, month) => {
  const dateForDays = new Date(year, month + 1, 0),
    numberOfDays = dateForDays.getDate(),
    arr = [];

  for (let i = 1; i <= numberOfDays; i++) {
    arr.push(i)
  }

  return arr;
};
const arrBeforeDay = (year, month) => {
  const dateForWeekday = new Date(year, month, 1);
  const beforeWeekday = dateForWeekday.getDay();
  let beforeNum = 0;
  switch (beforeWeekday) {
    case 0:
      beforeNum = 6;
      break;
    case 1:
      beforeNum = 0;
      break;
    default:
      beforeNum = beforeWeekday - 1
  }
  const arrBeforeDay = [];
  if (beforeNum !== 0) {
    const beforeDate = new Date(year, month, 0);
    const dateBeforeDate = beforeDate.getDate();
    const resultBeforeNum = dateBeforeDate - beforeNum;
    for (let i = resultBeforeNum; i < dateBeforeDate; i++) {
      arrBeforeDay.push(i + 1)
    }
  }
  return arrBeforeDay;
};
const arrAfterDay = (year, month) => {
  const dateForDays = new Date(year, month + 1, 0);
  const afterWeekday = dateForDays.getDay();
  let afterNum = 0;
  switch (afterWeekday) {
    case 0:
      afterNum = 0;
      break;
    case 1:
      afterNum = 6;
      break;
    default:
      afterNum = 7 - afterWeekday
  }

  const arrAfterDay = [];

  if (afterNum !== 0) {
    for (let i = 1; i <= afterNum + 14; i++) {
      arrAfterDay.push(i)
    }
  }


  if (afterNum === 0) {
    for (let i = 1; i <= afterNum + 14; i++) {
      arrAfterDay.push(i)
    }
  }
  return arrAfterDay;
};

const dateInformation = {
  date,
  year,
  month,
  day,
  week,
  time,
  arrDay: arrDay,
  arrBeforeDay: arrBeforeDay,
  arrAfterDay: arrAfterDay
};

export default dateInformation;