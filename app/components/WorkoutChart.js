import React, {Component} from 'react';
import c3 from 'c3';
import uuid from 'node-uuid';
import fs from 'fs';

export default class WorkoutChart extends Component {
    constructor(props) {
        super(props);

        this.initChart = this.initChart.bind(this);
        this.updateChart = this.updateChart.bind(this);
        this.updateMinutesVerticalLines = this.updateMinutesVerticalLines.bind(this);
        this.updateRegions = this.updateRegions.bind(this);

        this.data = [];

        try {
            this.data = JSON.parse(fs.readFileSync(props.dataFile, 'utf8'));
        } catch (e) {
            var errorMessage = `The file '${props.dataFile}' does not exists, or is not in JSON format.  ${e.message} `;
            console.error(errorMessage);
        }

        this.chartId = 'workout-chart-' + uuid.v4();

        this.state = {
            backgroundColor: props.backgroundColor || 'transparent'
        };
    }

    componentDidMount() {
        this.initChart();
        this.updateChart();
    }

    initChart() {
        this.regions = [
            {axis: 'y', start: 0.3, end: 0.6, class: 'regionY'},
            {axis: 'y', start: 0.6, end: 0.9, class: 'regionY2'},
            {axis: 'y', start: 0.9, end: 1.2, class: 'regionY3'},
            {axis: 'y', start: 1.2, class: 'regionY4'},
        ];

        var meanValue = (this.data
                .map(val => val.ftp)
                .reduce((a, b) => a + b)) / this.data.length;

        var horizontalLines = [{value: meanValue}];

        this.chart = c3.generate({
            bindto: '#' + this.chartId,
            size: {
                height: this.props.height
            },
            data: {
                json: this.data,
                keys: {
                    x: 'start',
                    value: ['ftp'],
                },
                type: this.props.chartType
            },
            color: {
                pattern: [this.props.color]
            },
            axis: {
                x: {show: false},
                y: {show: false}
            },
            point: {
                show: false
            },
            grid: {
                y: {
                    lines: horizontalLines
                }
            },
        });

        this.chart.legend.hide();
    }

    updateChart() {
        this.chart.resize({height: this.props.height});

        this.chart.load({
            json: this.data,
            keys: {
                x: 'start',
                value: ['ftp'],
            },
            type: this.props.chartType,
        });

        this.updateRegions();
        this.updateMinutesVerticalLines();

        this.state.backgroundColor = this.props.backgroundColor;

        this.chart.data.colors({
            ftp: this.props.color
        });
    }

    updateRegions() {
        if (this.props.regions && this.chart.regions().length === 0) {
            this.chart.regions.add(this.regions);
        } else if (!this.props.regions && this.chart.regions().length !== 0) {
            this.chart.regions.remove();
        }
    }

    updateMinutesVerticalLines() {
        var seconds = this.props.minutesLine * 60;
        var regionMinutes = this.data[this.data.length - 1].start % seconds;
        var xLines = [];

        for (var i = 1; i <= regionMinutes; i++) {
            xLines.push({
                value: i * seconds,
                text: i * this.props.minutesLine + ' min'
            });
        }

        this.chart.xgrids(xLines);
    }

    render() {
        if (this.chart) {
            this.updateChart();
        }
        return (
            <div>
                <div className="workoutChart" id={this.chartId} style={{backgroundColor: this.state.backgroundColor}}>
                </div>
            </div>
        );
    }
}
