import React, {Component} from 'react';
import dateInformation from "./dateInformation/dateInformation"
import Calendar from "./components/Calendar/Calendar";
import DateToday from "./components/DateToday/DateToday";
import NavigationButton from "./components/NavigationButton/NavigationButton";
import TodoList from "./components/TodoList/TodoList";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const {
      date, year, month,
      day, week, time,
      arrDay, arrBeforeDay, arrAfterDay
    } = dateInformation;

    this.state = {
      date, year, month,
      day, week, time,
      arrDay: arrDay(year, month),
      arrBeforeDay: arrBeforeDay(year, month),
      arrAfterDay: arrAfterDay(year, month),
      nameMonths: [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
      ],
      attributeDataId: null,
      toggle: false,
      dataTodoList: [
        {
          dataId: "1-5",
          todoList: [
            {
              id: 0,
              value: "Задача 1"
            },
            {
              id: 1,
              value: "Задача 2"
            }
          ]
        },
        {
          dataId: "1-6",
          todoList: [
            {
              id: 0,
              value: "Задача 2"
            }
          ]
        }
      ]
    };

    this.onPrevMonth = () => {
      const {month} = this.state;
      if (month === 0) {
        this.setState(({year, month}) => {
          year -= 1;
          month = 11;
          return this.addArrForEndYear(year, month)
        })
      } else {
        this.addArr("-")
      }
    };
    this.onNextMonth = () => {
      const {month} = this.state;
      if (month === 11) {
        this.setState(({year, month}) => {
          year += 1;
          month = 0;
          return this.addArrForEndYear(year, month)
        })
      } else {
        this.addArr("+")
      }
    };
    this.addArr = (prev) => {
      return this.setState(({year, month}) => {
        if (prev === "-") {
          month -= 1
        }
        if (prev === "+") {
          month += 1
        }
        return {
          month,
          arrDay: arrDay(year, month),
          arrBeforeDay: arrBeforeDay(year, month),
          arrAfterDay: arrAfterDay(year, month)
        }
      })
    };
    this.addArrForEndYear = (year, month) => {
      return {
        year, month,
        arrDay: arrDay(year, month),
        arrBeforeDay: arrBeforeDay(year, month),
        arrAfterDay: arrAfterDay(year, month)
      }
    };
    this.joinArr = (beforeArr, arr, afterArr) => {
      return [...beforeArr, ...arr, ...afterArr]
    };
    this.checkingToday = () => {
      const {date, year, month, day} = this.state;
      let num = null;
      const todayYear = date.getFullYear();
      const todayMonth = date.getMonth();
      const todayDay = date.getDate();
      if (todayYear === year
        && todayMonth === month
        && todayDay === day) {
        num = day;
      }
      return num;
    };
    this.ondblclickTd = (event) => {
      const id = event.target.dataset.id;
      this.setState(() => {
        return {
          attributeDataId: id,
          toggle: true
        }
      })
    };
    let i = 100;
    this.onAddTodoItem = (event) => {
      const elem = event.target.previousElementSibling;
      const newTodoItem = {id: i++, value: elem.value};
      elem.value = "";
      const {attributeDataId, dataTodoList} = this.state;
      const id = dataTodoList.findIndex(
        ({dataId}) => dataId === attributeDataId);

      if (id !== -1) {
        const arr = [...dataTodoList[id].todoList, newTodoItem];
        const obj = {dataId: attributeDataId, todoList: arr};
        const result = [
          ...dataTodoList.slice(0, id),
          obj,
          ...dataTodoList.slice(id + 1),
        ];
        this.setState(() => {
          return {
            dataTodoList: result
          }
        })
      }

      if (id === -1) {
        const arr = [newTodoItem];
        const obj = {dataId: attributeDataId, todoList: arr};
        dataTodoList.push(obj);
        this.setState(() => {
          return {
            dataTodoList: dataTodoList
          }
        })
      }
    };
    this.onDeleteTodoItem = (id) => {
      const {attributeDataId, dataTodoList} = this.state;
      const idx = dataTodoList
        .findIndex(({dataId}) => dataId === attributeDataId);
      const dataTodoListItem = dataTodoList[idx].todoList;
      const jdx = dataTodoListItem
        .findIndex((state) => state.id === id);
      const arr = [
        ...dataTodoListItem.slice(0, jdx),
        ...dataTodoListItem.slice(jdx + 1)
      ];

      let result;
      if (arr.length !== 0) {
        const obj = {
          dataId: attributeDataId, todoList: arr
        };
        result = [
          ...dataTodoList.slice(0, idx),
          obj,
          ...dataTodoList.slice(idx + 1),
        ];
      }

      if (arr.length === 0) {
        result = [
          ...dataTodoList.slice(0, idx),
          ...dataTodoList.slice(idx + 1),
        ];
      }

      this.setState(() => {
        return {
          dataTodoList: result
        }
      })
    }
  }


  render() {
    const {
      date, year, month, time, arrDay,
      arrBeforeDay, arrAfterDay, nameMonths,
      attributeDataId, dataTodoList, toggle
    } = this.state;
    const addNameKeyTodoList = dataTodoList
      .map((item) => item.dataId);
    const today = this.checkingToday();
    return (
      <div>
        <DateToday
          nameMonths={nameMonths}
          date={date}
          time={time}/>
        <NavigationButton
          year={year}
          month={month}
          nameMonths={nameMonths}
          onPrevMonth={this.onPrevMonth}
          onNextMonth={this.onNextMonth}/>
        <Calendar
          arrBeforeDay={arrBeforeDay}
          arrDay={arrDay}
          arrAfterDay={arrAfterDay}
          today={today}
          month={month}
          nameKeyTodoList={addNameKeyTodoList}
          joinArr={this.joinArr}
          ondblclickTd={this.ondblclickTd}/>
        <TodoList
          dataTodoList={dataTodoList}
          attributeDataId={attributeDataId}
          toggle={toggle}
          onAddTodoItem={this.onAddTodoItem}
          onDeleteTodoItem={this.onDeleteTodoItem}/>
      </div>
    );
  }
}

export default App;
