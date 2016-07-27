import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import _ from 'underscore';
import rd3 from 'react-d3';
import dat from '../data/DownwardSpiral.json';

var start = [];
var ftp = [];
for (var i = dat.length - 1; i >= 0; i--) {
  start.push(dat[i].start);
  ftp.push(dat[i].ftp);
}

var BarChart = rd3.BarChart;

var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
});

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },

  render: function() {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height} 
        x={this.props.offset} y={this.props.availableHeight - this.props.height} />
    );
  }
});

var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },

  render: function() {
    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var bars = _.map(this.props.data, function(point, i) {
      return (
        <Bar height={yScale(point)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} color={props.color} key={i} />
      )
    });

    return (
      <g>{bars}</g>
    );
  }
});
    
var BarChart = React.createClass({
  getDefaultProps: function() {
    return {
      width: 600,
      height: 300
    }
  },

  render: function() {
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={ftp} width={this.props.width} height={this.props.height} color="orange" />
      </Chart>
    );
  }
});

export default class WorkoutChart extends Component {
  render() {
    return (
      <div>
      <Link to="/">
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <div className={styles.container}>
          <BarChart />
        </div>
      </div> 
    );
  }
}
