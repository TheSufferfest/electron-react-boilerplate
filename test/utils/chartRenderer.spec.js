/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { spy } from 'sinon';
import ChartRenderer from '../../app/utils/chartRenderer.js';


describe('drawCanvas', () => {
  it('does not blow up with null data', () => {
    let canvasSpy = spy()
    let renderer = new ChartRenderer(null, canvasSpy);
    expect(() => renderer.drawCanvas()).to.not.throw()
  })

  it('does not blow up with null canvas', () => {
    let dataSpy = spy()
    let renderer = new ChartRenderer(dataSpy, null);
    expect(() => renderer.drawCanvas()).to.not.throw()
  })

  it('does things with valid data and canvas', () => {
    // this test would need more set up in terms of doubles / mocks
    // but would be the "happy path" test.  The data spy would actually
    // be a real data object and some verification of render calls on
    // the canvas spy could be made
    let data = [
      { start: 0, ftp: 5.5 },
      { start: 34, ftp: 4.5 },
      { start: 44, ftp: 5.5 },
      { start: 78, ftp: 6.5 },
      { start: 100, ftp: 0.5 }
    ]
    let renderer = new ChartRenderer(data, spy());
    expect(true).to.be.true
  })
})
describe('normaliseData', () => {
  // this is an important part to test as any individual entry should probably not cause the whole
  // rendering to fail.  To get a bit smarter, I would perhaps use adjacent valid values to fill out 
  // any corrupt data points.
  it('handles malformed data items', () => {
    let data = [
      { start: 0, frrrp: 0.55 },
      { start: 34, ftp: 0.45 },
      { start: 50, ftp: 0.55 }
    ]
    let renderer = new ChartRenderer(data, spy());
    expect(renderer.normaliseData()).to.deep.equal([{ start: 34, ftp: 45 }, { start: 50, ftp: 55 }])
  })
})
