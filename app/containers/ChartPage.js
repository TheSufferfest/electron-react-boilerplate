import React, { Component } from 'react';
import WorkoutChart from '../components/WorkoutChart';

function mapStateToProps(state) {
  return {

  };
}

export default class ChartPage extends Component {
  render() {
    return (
      <WorkoutChart url="app/data/DownwardSpiral.json" height="200" />
    );
  }
}
