import React, { Component } from 'react';
import WorkoutChart from '../components/WorkoutChart';

export default class ChartPage extends Component {
  render() {
    return (
      <WorkoutChart url="data/DownwardSpiral.json" height="80" width="800" blockColor="#9411EE" lineColor="gray" textColor="white"/>
    );
  }
}
