/**
 * Created by najorcruzcruz on 9/8/16.
 */

import {mount} from 'enzyme';
import ChartPage from '../../app/containers/ChartPage';
import { expect } from 'chai';
import React from 'react';

describe('ChartPage container', () => {

    var chartPage;

    before(() => {
        chartPage = mount(<ChartPage />);
    });

    it('Init state', () => {
        expect(chartPage.state().chartType).to.be.equal('area-step');
        expect(chartPage.state().regions).to.be.false;
    });

    it('Regions click', () => {
        chartPage.find('#cardiacZones').simulate('change', { target: { checked: true } });
        expect(chartPage.state().regions).to.be.true;
    });
});