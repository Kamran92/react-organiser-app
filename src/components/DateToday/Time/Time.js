import React, {Component, Fragment} from "react";
import classes from "./Time.module.css"

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time
    };

    this.addTime = () => {
      const time = new Date().toLocaleTimeString();
      this.setState(() => {
        return {
          time: time
        }
      })
    };
  }

  componentDidMount() {
    setInterval(this.addTime, 1000)
  }

  render() {
    const {time} = this.state;
    const {titleH1}= classes;
    return (
      <Fragment>
        <h1 className={titleH1}>{time}</h1>
      </Fragment>
    )
  }
}

export default Time;