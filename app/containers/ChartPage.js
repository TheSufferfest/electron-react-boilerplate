import React, {Component} from 'react';
import {Link} from 'react-router';
import chartPageStyle from './ChartPage.css';
import WorkoutChart from '../components/WorkoutChart';
import {Form, FormGroup, ControlLabel, FormControl, Checkbox, Col} from 'react-bootstrap';

export default class ChartPage extends Component {
    constructor(props) {
        super(props);

        this.selectTypeChange = this.selectTypeChange.bind(this);
        this.regionsCheckBoxChange = this.regionsCheckBoxChange.bind(this);
        this.selectMinutesLineChange = this.selectMinutesLineChange.bind(this);
        this.selectBackgroundColorChange = this.selectBackgroundColorChange.bind(this);
        this.selectColorChange = this.selectColorChange.bind(this);
        this.selectHeightChange = this.selectHeightChange.bind(this);

        this.state = {
            chartType: 'area-step',
            regions: false,
            minutesLine: 0,
            backgroundColor: 'transparent',
            color: '#9411EE',
            height: 150
        }
    }

    regionsCheckBoxChange(event) {
        this.setState({regions: event.target.checked});
    }

    selectTypeChange(event) {
        this.setState({chartType: event.target.value});
    }

    selectBackgroundColorChange(event) {
        this.setState({backgroundColor: event.target.value});
    }

    selectColorChange(event) {
        this.setState({color: event.target.value});
    }

    selectMinutesLineChange(event) {
        this.setState({minutesLine: parseInt(event.target.value)});
    }

    selectHeightChange(event) {
        this.setState({height: parseInt(event.target.value)});
    }

    render() {
        return (
            <div>
                <Link to="/" activeClassName={chartPageStyle.link}>
                    <i className="fa fa-arrow-left fa-3x"/>
                </Link>
                <h1 className={chartPageStyle.title}> Workout Chart</h1>

                <WorkoutChart dataFile="./app/data/DownwardSpiral.json"
                              minutesLine={this.state.minutesLine}
                              chartType={this.state.chartType}
                              regions={this.state.regions}
                              backgroundColor={this.state.backgroundColor}
                              height={this.state.height}
                              color={this.state.color}/>

                <br/>
                <br/>

                <Form horizontal className={chartPageStyle.form}>
                    <FormGroup controlId="selectChartType">
                        <Col componentClass={ControlLabel} sm={2}>
                            Chart Type
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" placeholder="select"
                                         onChange={this.selectTypeChange}>
                                <option value="area-step">Area Step</option>
                                <option value="step">Step</option>
                                <option value="area">Area</option>
                                <option value="area-spline">Area Line</option>
                                <option value="spline">Smooth Line</option>
                                <option value="line">Line</option>
                                <option value="scatter">Scatter</option>
                                <option value="bar">Bar</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="selectMinutesLine">
                        <Col componentClass={ControlLabel} sm={2}>Minutes Line</Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" placeholder="select"
                                         onChange={this.selectMinutesLineChange}>
                                <option value="0">0</option>
                                <option value="5">5</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="selectColor">
                        <Col componentClass={ControlLabel} sm={2}>Color</Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" placeholder="select" onChange={this.selectColorChange}>
                                <option value="#9411EE">Purple</option>
                                <option value="white">White</option>
                                <option value="black">black</option>
                                <option value="red">Red</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="selectBackgroundColor">
                        <Col componentClass={ControlLabel} sm={2}>Background Color</Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" placeholder="select"
                                         onChange={this.selectBackgroundColorChange}>
                                <option value="transparent">transparent</option>
                                <option value="white">White</option>
                                <option value="black">black</option>
                                <option value="red">Red</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="selectHeight">
                        <Col componentClass={ControlLabel} sm={2}>Height</Col>
                        <Col sm={10}>
                            <FormControl defaultValue={150} componentClass="select" placeholder="select"
                                         onChange={this.selectHeightChange}>
                                <option value="100">100</option>
                                <option value="150">150</option>
                                <option value="200">200</option>
                                <option value="250">250</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsSelect">
                        <Col componentClass={ControlLabel} sm={2}>Show Cardiac Zones</Col>
                        <Col sm={10}>
                            <Checkbox id="cardiacZones" onChange={this.regionsCheckBoxChange}>
                            </Checkbox>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
};
