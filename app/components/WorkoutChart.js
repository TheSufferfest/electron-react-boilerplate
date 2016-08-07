import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Home.css';
import $ from 'jquery';

export default class WorkoutChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    };
  }

  findMaxTopValue(chartData) {
    let max = 0;
    chartData.forEach((obj) => {
      if (obj.ftp > max)
        max = obj.ftp
    });
    return max;
  }

  findMaxXValue(chartData) {
    return chartData[chartData.length - 1].start;
  }

  findMinTopValue(model) {
    let min = Math.floor(model[0].height);
    model.forEach((obj) => {
      if (obj.height < min)
        min = obj.height;
    });
    return min;
  }

  
  findMedianTopValue(model) {
    let sum = 0;
    model.forEach((block) => {
      sum += block.height;
    });
    return sum / model.length;
  }

  parseModel(chartData) {

    let chart = [];
    let length = chartData.length % 2 == 0 ? chartData.length - 1 : chartData.length - 2;
    let maxTop = this.findMaxTopValue(chartData);
    let maxX = this.findMaxXValue(chartData);

    for (let i = 0; i < length; i += 1) {
      let begin = chartData[i];
      let end = chartData[i + 1];

      let x = this.CONTAINER_WIDTH * (begin.start / maxX);
      let width = this.CONTAINER_WIDTH * (end.start - begin.start) / maxX;
      let height = this.CONTAINER_HEIGHT * begin.ftp / maxTop;
      let y = this.CONTAINER_HEIGHT - height;

      let block = {
        x: x,
        y: y,
        width: width,
        height: height
      };
      chart.push(block);
    }
    return chart;
  }

  componentWillMount() {
    this.CONTAINER_HEIGHT = this.props.height;
    this.CONTAINER_WIDTH = this.props.width;
    this.BLOCK_COLOR = this.props.blockColor;
    this.LINE_COLOR = this.props.lineColor;
    this.TEXT_COLOR = this.props.textColor;
    this.loadChartData();
  }

  loadChartData() {
    let url = this.props.url;
    $.get(url, (data) => {
      this.setState({
        chartData: JSON.parse(data)
      });
    });
  }

  renderGraph() {
    if (this.state && this.state.chartData && this.state.chartData.length > 0) {
      let chartData = this.state.chartData;
      let model = this.parseModel(chartData);
      let chart = [];
      chart = this.addBlocks(model, chart);
      chart = this.addLine(model, chart);
      chart = this.addText(model, chart);
      return chart;
    }
  }


  addText(model, chart) {
    let value = this.findMinTopValue(model);
    let str = `${value} MIN`;
    chart.push(
      <text
        key={'text'}
        x={0}
        y={75}
        fill={this.TEXT_COLOR}
        stroke={this.TEXT_COLOR}>
        {str}
      </text>
    );
    return chart;
  }

  addLine(model, chart) {
    let value = this.findMedianTopValue(model);
    chart.push(
      <line
        key={'line'}
        x1="0"
        y1={value}
        x2={this.CONTAINER_WIDTH}
        y2={value}
        fill={this.LINE_COLOR}
        stroke={this.LINE_COLOR}>
      </line>
    );
    return chart;
  }

  addBlocks(model, chart) {
    model.forEach((block, index) => {
      chart.push(
        <rect
          key={'block' + index}
          x={block.x + 'px'}
          y={block.y + 'px'}
          width={block.width + 'px'}
          height={block.height + 'px'}
          fill={this.BLOCK_COLOR}
          stroke={this.BLOCK_COLOR}>
        </rect>
      )
    });
    return chart;
  }

  render() {
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div className={styles.container}>
          <svg width={this.CONTAINER_WIDTH} height={this.CONTAINER_HEIGHT}>
            {this.renderGraph()}
          </svg>
        </div>
      </div>
    );
  }
}