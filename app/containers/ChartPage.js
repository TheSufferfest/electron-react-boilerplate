import React, { Component } from 'react';
import WorkoutChart from '../components/WorkoutChart';
import { Link } from 'react-router';
import styles from '../components/WorkoutChart.css';

export default class ChartPage extends Component {
  render() {
    return (
      <div className={styles.WorkoutChartPage}>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <h2>Downward Spiral Workout</h2>
        <WorkoutChart data_url="data/DownwardSpiral.json" />
      </div>
    );
  }
}
