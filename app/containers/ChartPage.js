import { connect } from 'react-redux';
import React, { Component } from 'react';
import WorkoutChart from '../components/WorkoutChart';

function mapStateToProps(state) {
  return {
    data: state.chart
  };
}

export default connect(mapStateToProps)(WorkoutChart);
