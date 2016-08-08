import React, { Component } from 'react';
let ReactDOM = require('react-dom');
import styles from './WorkoutChart.css';
var fs = require('fs');

export default class ChartElement extends Component {

    // calculate the scaling factors for the graph so it fits the DOM element
    getStyle (){
        const padding = 125; // account for the internal styling of this component
        let wScale = (this.props.state.width - padding) / this.props.state.total;
        let hScale = this.props.state.height / this.props.state.maxHeight;
        return {
            height: this.props.data.ftp * hScale + 'px',
            width: this.props.data.d * wScale + 'px'
        };
    }

    // render this section of the graph
    render (){
        return (
            <div className={styles.chartelement} style={this.getStyle ()}></div>
        );
    }
}

export default class ChartLine extends Component {

    // calculate the correct scaled line height
    getStyle (){
        let hScale = this.props.state.height / this.props.state.maxHeight;
        const padding = 4;
        return {
            top: -(this.props.state.avg * hScale + padding) + 'px'
        };
    }

    // render this section of the graph
    render (){
        return (
            <div className={styles.line} style={this.getStyle ()}></div>
        );
    }
}

export default class ChartInfo extends Component {

    // render the chart info
    render (){
        let state = this.props.state;

        function getInfo (){
            return Math.round (state.total / 60) + ' MIN';
        }

        return (
            <div className={styles.info}>{getInfo()}</div>
        );
    }
}

export default class WorkoutChart extends Component {

    // handle window resize events
    resize (){
        let dom = ReactDOM.findDOMNode(this);
        let width = dom.offsetWidth;
        this.setState ({width: width});
    }

    // get the data read in and store in our state
    constructor (props){
        super (props);
        let data = this.getData (props.url);
        this.state = {
            data: data.data,
            total: data.total,
            maxHeight: data.maxHeight,
            avg: data.avg,
            width: 0,
            height: props.height
        };
    }

    // register for a window resize event
    componentDidMount (){
        this.resize ();
        window.addEventListener ('resize', this.resize.bind(this), false);
    }

    // cleanup
    componentWillUnmount (){
        window.removeEventListener ('resize', this.resize.bind(this), false);
    }

    // go get the data from a file url and load it
    getData (url){
        let file = fs.readFileSync(url);
        let json;
        try {
            json = JSON.parse (file.toString ());
        }
        catch (e){
            json = [];
        }
        let avg = 0;
        let maxHeight = 0;

        json.forEach (function (e, i){
            e.d = (json[i+1]) ? json[i+1].start - e.start : 50;
            avg += e.ftp * e.d;
            maxHeight = (e.ftp > maxHeight) ? e.ftp : maxHeight;
        });
        let totalTime = json[json.length-1].start;
        avg /= totalTime;
        return {data:json, total:totalTime, avg:avg, maxHeight: maxHeight};
    }

    // render this graph
    render () {

        // create all the graph elements
        let state = this.state;
        let graphNodes = this.state.data.map(function (e, i) {
            return (
                <ChartElement data={e} key={i} state={state}/>
            );
        });

        // set the height of this graph
        function getStyle (){
            return {
                height: state.height + 'px'
            }
        }

        return (
            <div>
                <div className={styles.container} style={getStyle()}>
                    {graphNodes}
                    <ChartLine state={state} />
                    <ChartInfo state={state} />
                </div>
            </div>
        );
    }
}
