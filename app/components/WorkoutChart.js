import React, { Component } from 'react';
import { Link } from 'react-router';
import Chart from 'chart.js';
import styles from './WorkoutChart.css';
import ChartRenderer from '../utils/ChartRenderer.js'

export default class WorkoutChart extends Component {
  componentDidMount() {
    new ChartRenderer(this.props.workout.data, this.workoutCanvas).drawCanvas()
  }
  render() {
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.container}>
          <h3>Are you ready for {this.props.title}?</h3>
          <canvas ref={(ref) => this.workoutCanvas = ref } width="900" height="300"></canvas>
        </div>
      </div>
    );
  }
}
