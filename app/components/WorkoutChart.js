import React, { Component } from 'react';
import { Link } from 'react-router';
import Chart from 'chart.js';
import styles from './WorkoutChart.css';

export default class WorkoutChart extends Component {
  width(data, currentIndex) {
    return data[currentIndex + 1].start - data[currentIndex].start
  }
  yStart(ftp) {
    let fullHeight = document.getElementById('workout2').clientHeight
    return fullHeight - (ftp * 100)
  }
  height(ftp) {
    return ftp * 100
  }
  componentDidMount() {
    let rawCanvas = document.getElementById('workout2').getContext('2d')
    rawCanvas.fillStyle = 'rgba(255,99,132,0.8)'
    let workout = this.props.workout.data
    for (let i = 0; i < workout.length - 1; i++) {
      rawCanvas.fillRect(workout[i].start, this.yStart(workout[i].ftp), this.width(workout, i), this.height(workout[i].ftp))
    }
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h3>Your Sufferfest workout</h3>
          <canvas id="workout2" width="600" height="300"></canvas>
        </div>
      </div>
    );
  }
}
