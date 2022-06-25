import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import React, { Component } from 'react';
import styles from './StopWatch.module.css';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date(0, 0, 0, 0, 0, 0) };
    this.idTimeout = null;
    this.started = false;
  }
  tick = () => {
    this.setState((state) => {
      const { time } = state;
      const newTime = new Date(time.getTime() + 1000);
      return { time: newTime };
    })
  }
  start = () => {
    this.started = true;
    this.stop();
    this.idTimeout = setTimeout(this.tick, 1000)
  }
  stop = () => {
    clearTimeout(this.idTimeout);
    this.idTimeout = null;
  }
  reset = () => {
    this.started = false;
    this.stop();
    this.setState({ time: new Date(0, 0, 0, 0, 0, 0) })
  }

  componentDidMount() {
    this.start();
  }
  componentDidUpdate() {
    if (this.started) {
      this.start();
    }
  }
  componentWillUnmount() {
    this.stop();
  }

  render() {
    const { time } = this.state;
    return (
      <article className={styles.container}>
        <h2 className={styles.numbers}>{time.toLocaleTimeString('it-IT')}</h2>
      
        <div className={`${styles.button} ${styles.start}`} onClick={this.start}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
        <div className={`${styles.button} ${styles.stop}`} onClick={this.stop}>
          <FontAwesomeIcon icon={faStop} />
        </div>
        <div className={`${styles.button} ${styles.reset}`} onClick={this.reset}>
          <FontAwesomeIcon icon={faRotate} />
        </div>

      </article>
    );
  }
}

export default StopWatch;
