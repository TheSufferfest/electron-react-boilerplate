/* eslint no-unused-expressions: 0 */
import {expect} from 'chai';
import {spy} from 'sinon';
import React from 'react';

import {mount} from 'enzyme';
import WorkoutChart from '../../app/components/WorkoutChart';


describe('WorkoutChart component', () => {

    var chartComponent;
    var file = './app/data/DownwardSpiral.json';

    before(() => {
        chartComponent = mount(<WorkoutChart dataFile={file} regions={true}/>);
    });

    it('calls componentDidMount', () => {
        spy(WorkoutChart.prototype, 'componentDidMount');
        mount(<WorkoutChart dataFile={file}/>);
        expect(WorkoutChart.prototype.componentDidMount.calledOnce).to.equal(true);
    });

    it('Load data correctly', () => {
        expect(chartComponent.instance().data.length).to.be.equal(60);
    });

    it('Data file is passed correctly', () => {
        expect(chartComponent.props().dataFile).to.be.equal(file);
    });

    it('Contains init DIV.workoutChart', () => {
        var workoutChartDiv = chartComponent.find('div.workoutChart').get(0);
        expect(workoutChartDiv.tagName).to.be.equal('DIV');
    });
});
