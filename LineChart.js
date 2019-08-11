var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import "./LineChart.css";

var LineChart = function (_Component) {
  _inherits(LineChart, _Component);

  function LineChart() {
    _classCallCheck(this, LineChart);

    return _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).apply(this, arguments));
  }

  _createClass(LineChart, [{
    key: "getMinX",


    // GET MAX & MIN X
    value: function getMinX() {
      var data = this.props.data;

      return data[0].x;
    }
  }, {
    key: "getMaxX",
    value: function getMaxX() {
      var data = this.props.data;

      return data[data.length - 1].x;
    }
    // GET MAX & MIN Y

  }, {
    key: "getMinY",
    value: function getMinY() {
      var data = this.props.data;

      return data.reduce(function (min, p) {
        return p.y < min ? p.y : min;
      }, data[0].y);
    }
  }, {
    key: "getMaxY",
    value: function getMaxY() {
      var data = this.props.data;

      return data.reduce(function (max, p) {
        return p.y > max ? p.y : max;
      }, data[0].y);
    }
  }, {
    key: "getSvgX",
    value: function getSvgX(x) {
      var svgWidth = this.props.svgWidth;

      return x / this.getMaxX() * svgWidth;
    }
  }, {
    key: "getSvgY",
    value: function getSvgY(y) {
      var svgHeight = this.props.svgHeight;

      return svgHeight - y / this.getMaxY() * svgHeight;
    }
  }, {
    key: "makeAxis",
    value: function makeAxis() {
      var minX = this.getMinX(),
          maxX = this.getMaxX();
      var minY = this.getMinY(),
          maxY = this.getMaxY();
      return React.createElement(
        "g",
        { className: "linechart_axis" },
        React.createElement("line", {
          x1: this.getSvgX(minX), y1: this.getSvgY(minY),
          x2: this.getSvgX(maxX), y2: this.getSvgY(minY) }),
        React.createElement("line", {
          x1: this.getSvgX(minX), y1: this.getSvgY(minY),
          x2: this.getSvgX(minX), y2: this.getSvgY(maxY) })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          svgHeight = _props.svgHeight,
          svgWidth = _props.svgWidth;

      return React.createElement(
        "svg",
        { viewBox: "0 0 " + svgWidth + " " + svgHeight },
        this.makePath(),
        this.makeAxis()
      );
    }
  }]);

  return LineChart;
}(Component);

LineChart.defaultProps = {
  data: [],
  color: '#2196F3',
  svgHeight: 300,
  svgWidth: 700
};
export default LineChart;