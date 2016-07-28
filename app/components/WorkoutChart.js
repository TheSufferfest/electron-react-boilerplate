import * as d3 from 'd3';
import styles from './Chart.css';
import { Link } from 'react-router';
import React, { Component } from 'react';
import globalStyles from './Global.css';

let chart = {};

chart.create = function(el, props, data) {
  let svg = d3.select(el)
    .append('svg')
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height);

  this.update(el, props, data);
}

chart.update = function(el, props, data) {
  const scales = this._getScales(el, props, data);

  this._drawArea(el, scales, data, props);
  this._drawLines(el, scales, data);
}

chart._getScales = function(el, props, data) {
  let x = d3.scaleLinear()
    .range([0, el.offsetWidth]);

  x.domain(d3.extent(data, d => d.start));

  let y = d3.scaleLinear()
    .range([parseInt(props.height, 10), 0]);

  y.domain([0, d3.max(data, d => d.ftp)]);

  return {x: x, y: y};
}

chart._drawLines = function(el, scales, data) {
  let line = d3.line()
    .curve(d3.curveStepBefore)
    .x(d => scales.x(d.start))
    .y(d => scales.y(d.ftp));

  let path = d3.select(el).select('.d3')
    .selectAll('.d3-step-line')
    .data([data])
    .attr('class', 'd3-step-line')
    .enter()
      .append('path')
      .attr('class', 'd3-step-line')
      .datum(data)
      .attr('d', line);

  let yAxis = d3.axisBottom(scales.x).tickSize(0).tickFormat('');
  let average = scales.y(d3.mean(data, d => d.ftp));

  d3.select(el).select('.d3')
    .selectAll('.d3-axis')
    .data([data])
    .attr('class', `${styles.axis} d3-axis`)
    .enter()
      .append('g')
      .attr('transform', `translate(0, ${average})`)
      .attr('class', `${styles.axis} d3-axis`)
      .call(yAxis);
}

chart._drawArea = function(el, scales, data, props) {
  let area = d3.area()
    .curve(d3.curveStepBefore)
    .x(d => scales.x(d.start))
    .y0(parseInt(props.height, 10))
    .y1(d => scales.y(d.ftp));

  let path = d3.select(el).select('.d3')
    .selectAll('.step-area')
    .data([data])
    .attr('class', `${styles.stepArea} step-area`)
    .enter()
      .append('path')
      .attr('class', `${styles.stepArea} step-area`)
      .datum(data)
      .attr('d', area);
}

export default class WorkoutChart extends Component {

  getChartData() {
    return this.props.data;
  }

  getTime() {
    const {data} = this.props;
    return Math.round(data[data.length - 1].start / 60);
  }

  componentDidMount() {
    chart.create(this.chartEl, {
      width: '100%',
      height: '100px'
    }, this.getChartData());
  }

  componentDidUpdate(prevProps, prevState) {
    chart.update(this.chartEl, {
      width: '100%',
      height: '300px'
    }, this.getChartData());
  }

  render() {
    return (
      <div className={globalStyles.content}>
        <div className={globalStyles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chart} ref={(ref) => this.chartEl = ref}></div>
          <div className={styles.chartLength}>{this.getTime()} min</div>
        </div>
      </div>
    );
  }
}
