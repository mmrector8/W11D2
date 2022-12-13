import React, { useEffect, useState } from 'react';

//export class ClockToggle extends React.Component {
  // render () {
    const ClockToggle = ({toggleClock})=>{
    return (
      <button
        type="button"
        className="clock-toggle"
        onClick={toggleClock}
      >
        Toggle Clock
      </button>
    )
  }
 // }

// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: new Date(),
//     };
//   }
  const Clock = () => {  
    //possible problem area - new Date
    const [time, setTime] = useState(new Date())

  // componentDidMount() {
  //   this.interval = setInterval(this.tick, 1000);
  // }
  const tick = () => {
      setTime(new Date());
    }

  useEffect(()=>{
    const clockInterval = setInterval(()=>{
      setTime(new Date())
    }, 1000)

    return ()=> clearInterval(clockInterval);
  }, [time])
  
  // componentWillUnmount() {
  //   console.log("Clearing Clock interval!")
  //   clearInterval(this.interval);
  // }
  
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    const timezone = time
      .toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
      .replace(/[^A-Z]/g, "") // Strip out all but capitals
      .slice(3); // Eliminate initial GMT

    return (
      <section className="clock-section">
        <h1>Clock</h1>
        <div className='clock'>
          <p>
            <span>
              Time:
            </span>
            <span>
              {hours}:{minutes}:{seconds} {timezone}
            </span>
          </p>
          <p>
            <span>
              Date: 
            </span>
            <span>
              {time.toDateString()}
            </span>
          </p>
        </div>
      </section>
    );
}

export {Clock, ClockToggle};