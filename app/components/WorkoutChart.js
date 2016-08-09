import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

class Chart extends Component {

  static propTypes = {
    arrStart: React.PropTypes.array,
    arrFtp: React.PropTypes.array,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    color: React.PropTypes.string
  }

  render() {
    const arr = [];
    const length = this.props.arrStart.length;
    let maxFtp = Math.max(...this.props.arrFtp);
    let fullWidth = 0;
    let sumFtp = 0;
    let xCoord = 0;

    for (let i = 0; i < length; i++) {
      fullWidth += this.props.arrStart[i];
      sumFtp   += this.props.arrFtp[i];
    }

    // create bars
    for (let i = 0; i < length; i++) {
      arr.push(<rect x={xCoord}
                     y={this.props.height - this.props.height * this.props.arrFtp[i] / maxFtp}
                     key={i}
                     style={{fill: this.props.color,
                       stroke: this.props.color,
                       height: `${this.props.height * this.props.arrFtp[i]/maxFtp}px`,
                       width: `${this.props.arrStart[i] * this.props.width / fullWidth}px`}}/>);

      xCoord += (this.props.arrStart[i] * this.props.width / fullWidth);
    }

    // create text showing number of minutes
    arr.push(<text x='0' y={this.props.height - 15} fill='white' key='time'>{`${length} MIN`}</text>)

    // create line showing average ftp
    arr.push(<line x1='0'
                   y1={this.props.height * (1 - sumFtp / (length * maxFtp))}
                   x2={fullWidth}
                   y2={this.props.height * (1 - sumFtp / (length * maxFtp))}
                   key='avgLine'
                   style={{stroke:'gray', strokeWidth:2}}/>)

    return (<svg style={{width: this.props.width, height: this.props.height}}>{arr}</svg>);
  }
}

export default class WorkoutChart extends Component {

  static propTypes = {
    data: React.PropTypes.array
  }

  state = {containerWidth: window.innerWidth/2, containerHeight: window.innerHeight/3}

  constructor() {
    super();
    this.handleResize = this.handleResize.bind(this)
  }

  handleResize(e) {
    this.setState({containerWidth: window.innerWidth/2, containerHeight: window.innerHeight/3});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const data = this.props.data;
    const arrFtp   = [];
    const arrStart = [data[0].start];
    for (var i = 0; i < data.length; i++) {
      if (i > 0) arrStart.push(data[i].start - data[i-1].start);
      arrFtp.push(data[i].ftp);
    }

    return (
      <div>
        <Link to="/">
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <div className={styles.container}>
          <h2>I am a Chart page</h2>
          <Chart arrStart={arrStart}
                 arrFtp={arrFtp}
                 width={this.state.containerWidth}
                 height={this.state.containerHeight}
                 color='blue'/>
        </div>
      </div>
    );
  }
}
