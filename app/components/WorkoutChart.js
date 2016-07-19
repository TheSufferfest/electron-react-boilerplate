import React, { Component } from 'react';
import { Link } from 'react-router';
import Chart from 'chart.js';
import styles from './WorkoutChart.css';

export default class WorkoutChart extends Component {
  width(data, currentIndex) {
    return data[currentIndex + 1].start - data[currentIndex].start
  }
  yStart(ftp) {
    let fullHeight = document.getElementById('workout2').clientHeight
    return fullHeight - (ftp * 10)
  }
  height(ftp) {
    return ftp * 10
  }
  componentDidMount() {
    let rawCanvas = document.getElementById('workout2').getContext('2d')
    let forCanvas = [
      {start: 0, ftp: 0.5},
      {start: 95, ftp: 5.0},
      {start: 133, ftp: 6.5},
      {start: 140, ftp: 7.5},
      {start: 220, ftp: 0.5},
    ]
    rawCanvas.fillStyle = 'rgba(255,99,132,0.8)'
    rawCanvas.fillRect(forCanvas[0].start, this.yStart(forCanvas[0].ftp), this.width(forCanvas, 0), this.height(forCanvas[0].ftp))
    rawCanvas.fillRect(forCanvas[1].start, this.yStart(forCanvas[1].ftp), this.width(forCanvas, 1), this.height(forCanvas[1].ftp))
    rawCanvas.fillRect(forCanvas[2].start, this.yStart(forCanvas[2].ftp), this.width(forCanvas, 2), this.height(forCanvas[2].ftp))
    rawCanvas.fillRect(forCanvas[3].start, this.yStart(forCanvas[3].ftp), this.width(forCanvas, 3), this.height(forCanvas[3].ftp))

    /*let rawData = [16, 34, 78, 34,34, 34, 34, 34, 34]
    let labels = Array(rawData.length).fill().map((_, idx) => idx.toString())
    let colours = Array(rawData.length).fill('rgba(255, 99, 132, 0.8)')
    let chartCanvas = document.getElementById('workout')
    let workoutChart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Downward Spiral',
            data: rawData,
            backgroundColor: colours
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            { 
              barPercentage: 1,
              categoryPercentage: 1,
              display: false 
            }
          ]
        },
        legend: {
          display: false  
        },
        tooltips: {
          enabled: false
        }
      }
    })*/
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h3>Your Sufferfest workout</h3>
          <canvas id="workout2" width="600" height="300"></canvas>
        </div>
      </div>
    );
  }
}
