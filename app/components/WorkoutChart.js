import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { data } from '../data/DownwardSpiral.js';
import styles from './WorkoutChart.css';

export default class WorkoutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {data: data};
  }
  static propTypes = {
  };
  componentDidMount() {
    this.prepareCanvas();
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }

  prepareCanvas() {
    this.ctx = this.refs.canvas.getContext('2d');
    if (window.devicePixelRatio) {
      const canvas = this.refs.canvas;
      const width = canvas.width;
      const height = canvas.height;
      const cssWidth = width;
      const cssHeight = height;

      canvas.width =  width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style = `width: ${cssWidth}px; height: ${cssHeight}px;`;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  updateCanvas() {
    const data = this.state.data;
    const count = data.length;
    const startMax = Math.max(...data.map((obj) => { return obj.start }))
    const startMin = Math.min(...data.map((obj) => { return obj.start }))
    const ftpMin = Math.min(...data.map((obj) => { return obj.ftp }))
    const ftpMax = Math.max(...data.map((obj) => { return obj.ftp }))

    // Clear the canvas
    this.ctx.clearRect(0, 0, 870, 96);
    // Paint the background
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, 870, 96);

    // Prepare Context for drawing chart
    this.ctx.fillStyle = "#9428ec";
    this.ctx.strokeStyle = "#94f8ec";

    // we need 4 pieces of info to draw a data point Pi, the x, y position of the bottom right 
    // corner and the width and height.
    // x is start / startMax of Pi-1
    // y is always 0
    // width is startPi - startPi-1 / startMax
    // height is ftp factor * max height
    // in order to draw a rectangle we need two points.
    let last;
    for (let obj of data) {
      if (!last) {
        last = obj;
        continue;
      }
      // We want all rects to join up so we save the last x + width and use it for the next rect
      let x = Math.round(last.start / startMax * 870);
      if (last.xw > 0) {
        x = last.xw;
      }
      const y = 0;
      const w = Math.round((obj.start - last.start) / startMax * 870);
      const h = (last.ftp / ftpMax) * 96;
      this.drawRect(x, y, w, h);
      last = obj;
      last.xw = x + w;
    }

    // Draw the guide line
    const guideY = 96 - ((1.0 / ftpMax) * 96);
    this.ctx.strokeStyle = "#dcdcdc";
    this.ctx.beginPath();
    this.ctx.moveTo(0, guideY);
    this.ctx.lineTo(870, guideY);
    this.ctx.stroke();

    // Draw the workout length
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "13px sans-serif";
    this.ctx.fillText(count + " MIN", 5, 96 - 11);
  }
  // draw the rectangle using bottom left corner as 0, 0 
  drawRect(x, y, w, h) {
    this.ctx.fillRect(x, 96 - h + y, w, h);
  }

  render() {
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

        <div className={styles.container}>
          <h2>Chart page</h2>
          <div className={styles.chart}>
          <canvas ref="canvas" width={870} height={96}></canvas>
          </div>
        </div>
      </div>
    );
  }
}
