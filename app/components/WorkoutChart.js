import React, { Component } from 'react';
import { Link } from 'react-router';
import Chart from 'chart.js';
import styles from './WorkoutChart.css';

export default class WorkoutChart extends Component {
  width(data, currentIndex) {
    return data[currentIndex + 1].start - data[currentIndex].start
  }
  yStart(ftp) {
    let fullHeight = document.getElementById('workout').clientHeight
    return fullHeight - ftp 
  }
  height(ftp) {
    return ftp 
  }
  componentDidMount() {
    let rawCanvas = document.getElementById('workout').getContext('2d')
    rawCanvas.fillStyle = 'rgba(255,99,132,0.8)'
    let rawWorkout = this.props.workout.data
    let workoutLength = rawWorkout[rawWorkout.length - 1].start
    let sectionFactor = document.getElementById('workout').clientWidth / workoutLength
    let workout = rawWorkout.map((data) => { return { 'start': Math.floor(data.start * sectionFactor), 'ftp': (data.ftp * 100) } })
    for (let i = 0; i < workout.length - 1; i++) {
      rawCanvas.fillRect(workout[i].start, this.yStart(workout[i].ftp), this.width(workout, i), workout[i].ftp)
    }
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h3>Are you ready for {this.props.title}?</h3>
          <canvas id="workout" width="900" height="300"></canvas>
        </div>
      </div>
    );
  }
}
