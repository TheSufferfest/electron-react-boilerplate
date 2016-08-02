import React, { Component } from 'react';
import styles from './WorkoutChart.css';

export default class WorkoutChart extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      chart_data: []
    }
  }

  componentWillMount() {
    var req = new XMLHttpRequest();
    var self = this;
    req.onload = function(e) {
      self.setState({
        chart_data: JSON.parse(this.responseText)
      })
    };
    req.open('get', this.props.data_url);
    req.send();
  }

  getChartSVG(chart_data) {
    if (chart_data.length == 0) return false;
    var end = chart_data[chart_data.length-1]['start'],
        top = (function(data) {
          return data.concat().sort(function(a,b) {
            if (a['ftp'] > b['ftp']) return -1;
            if (a['ftp'] < b['ftp']) return 1;
            return 0;
          })[0]['ftp'];
        })(chart_data),
        chart = [],
        self = this;

    chart_data.forEach(function(v, i, a) {
      var _this_x = (v['start'] / end) * 100,
          _next_x = i < a.length - 1 ? (a[i + 1]['start'] / end) * 100 : 100;

      chart.push(
        <rect 
          key={ 'bar' + i.toString() } 
          x={ _this_x.toString() + '%' } 
          y={ (100 - ((v['ftp'] / top) * 100)).toString() + '%' }
          width={ (_next_x - _this_x) + '%' }
          height={ ((v['ftp'] / top) * 100).toString() + '%' }
          fill={ self.props.bar_background }
          stroke={ self.props.bar_background }>
        </rect>
      );
    });

    for (var i = top; i > 1; i--) {
      var _y = (100 - ((Math.floor(i) / top) * 100)).toString() + '%';

      chart.unshift(
        <line 
          key={ 'line' + (Math.floor(i)).toString() }
          x1="0" 
          y1={ _y }
          x2="100%"
          y2={ _y }
          strokeWidth="1"
          stroke={ self.props.line_stroke }>
        </line>
      );
    }

    chart.push(
      <text
        key="workout length"
        x="8px"
        y="90%"
        fontFamily="Lato,Helvetica"
        fill={ self.props.text_color }>
        { Math.ceil(end / 60).toString() + ' MIN' }
      </text>
    );

    return chart;
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <svg width={this.props.width} height={this.props.height} style={{maxWidth: '100%'}}>
            { this.getChartSVG(this.state.chart_data) }
          </svg>
        </div>
      </div>
    );
  }
}

WorkoutChart.defaultProps = {
  bar_background: '#9411EE',
  text_color: '#FFFFFF',
  line_stroke: '#CECDCE',
  width: '800px',
  height: '80px'
};

WorkoutChart.propTypes = { data_url: React.PropTypes.string.required };