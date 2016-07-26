import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutChart from '../components/WorkoutChart';
import Spiral from '../data/DownwardSpiral.json';

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps() {
  return {}
}
class ChartPage extends Component {
  render() {
    return (<WorkoutChart workout={Spiral} title={'Downward Spiral'} />)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChartPage)
