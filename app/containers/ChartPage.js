import React, { Component } from 'react';
import WorkoutChart from '../components/WorkoutChart';
import data from '../data/DownwardSpiral.json';

export default class ChartPage extends Component {
  render() {
    return (
      <WorkoutChart data={data}/>
    );
  }
}
