import React, { Component } from 'react';
import WorkoutChart from '../components/WorkoutChart';
import Spiral from '../data/DownwardSpiral.json';

function mapStateToProps(state) {
  return {

  };
}
export default class ChartPage extends Component {
  render() {
    return (
      <WorkoutChart workout={Spiral} />
    );
  }
}
