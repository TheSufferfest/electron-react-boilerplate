import 'babel-polyfill';
import {jsdom} from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
window.localStorage = window.sessionStorage = {
    getItem(key) {
        return this[key];
    },
    setItem(key, value) {
        this[key] = value;
    },
    removeItem(key) {
        this[key] = undefined;
    },
};

if (!("SVGPathSeg" in window)) {
    // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
    window.SVGPathSeg = function (type, typeAsLetter, owningPathSegList) {
        this.pathSegType = type;
        this.pathSegTypeAsLetter = typeAsLetter;
        this._owningPathSegList = owningPathSegList;
    };

    window.SVGPathSegList = function() {

    };

    window.SVGPathSeg.prototype.classname = "SVGPathSeg";
}
