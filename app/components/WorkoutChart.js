import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './WorkoutChart.css';
import data from '../data/DownwardSpiral.json';

class Chart extends Component {

  static propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string
  }

  // adjust to two decimal points
  round(number) {
    return Math.round(number * 100)/100
  }

  render() {
    const length = this.props.data.length
    const maxStart = Math.max(...this.props.data.map(d => d.start))
    const maxFtp = Math.max(...this.props.data.map(d => d.ftp))
    const widthPx = this.round(this.props.width/maxStart)
    const heightPx = this.round(this.props.height/maxFtp)

    let draw = []

    // create rectangular bars
    for (let i = 0; i < length; i++) {
      draw.push(
        <rect
          key={ i }
          x={ this.round(this.props.data[i].start * widthPx) }
          y={ this.props.height - this.props.data[i].ftp * heightPx }
          fill={ this.props.color }
          stroke={ this.props.color }
          strokeWidth={ 2 }
          height={ this.props.data[i].ftp * heightPx }
          width={ this.round((i == length-1?1:(this.props.data[i+1].start - this.props.data[i].start - 1)) * widthPx) }
        />)
    }

    const averageFtp = maxFtp / 2

    // create line showing average ftp
    draw.push(
      <line
        key='average'
        x1='0'
        y1={ this.props.height - averageFtp * heightPx }
        x2={ maxStart * widthPx }
        y2={ this.props.height - averageFtp * heightPx }
        stroke='gray'
      />)

    draw.push(<text x='10' y={ this.props.height - 10 } fill='white' key='start'>{ length } MIN</text>)

    return (
      <div className={ styles.chart }>
        <svg style={{ width: maxStart * widthPx, height: this.props.height }}>{ draw }</svg>
      </div>
    );
  }
}


export default class WorkoutChart extends Component {

  constructor() {
    super();
    this.state = {
      width: window.innerWidth * 0.8,
      height: 200
    }
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth * 0.8,
      height: 200
    })
  }

  /* add event listener */
  componentDidMount () {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  /* remove event listener */
  componentWillUnmount () {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  render() {
    return (
      <div>
        <div className={ styles.backButton }>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div ref="container" className={ styles.container }>
            <h2>I am a Chart page</h2>
            <Chart
              data={ data }
              width={ this.state.width }
              height={ this.state.height }
              color='#9411ef'
            />
          </div>
        </div>
      </div>
    )
  }
}
