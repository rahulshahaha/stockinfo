var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "card" },
        React.createElement(
          "h1",
          { className: "companyName" },
          this.props.name
        ),
        React.createElement(
          "h6",
          { className: "currentPrice" },
          "$",
          this.props.price
        ),
        React.createElement(
          "h6",
          { className: this.props.changeType },
          "\xA0 (",
          this.props.percentChange,
          "%)"
        ),
        React.createElement(
          "div",
          null,
          React.createElement(App, { chartData: this.props.chartData })
        )
      );
    }
  }]);

  return Card;
}(React.Component);

var Deck = function (_React$Component2) {
  _inherits(Deck, _React$Component2);

  function Deck(props) {
    _classCallCheck(this, Deck);

    var _this2 = _possibleConstructorReturn(this, (Deck.__proto__ || Object.getPrototypeOf(Deck)).call(this, props));

    _this2.state = {
      stocks: [{ ticker: "sfdfsd", name: "Very Long Company Name Incorporated", price: 123, percentChange: 4, changeType: "percentChangeUp" }, { ticker: "W", name: "Wayfair, Inc.", price: 123, percentChange: -2, changeType: "percentChangeDown" }, { ticker: "B", name: "B", price: 123 }, { ticker: "C", name: "C", price: 123 }, { ticker: "D", name: "D", price: 123 }, { ticker: "E", name: "E", price: 123 }, { ticker: "F", name: "F", price: 123 }, { ticker: "G", name: "G", price: 123 }]
    };
    _this2.getStockData();
    return _this2;
  }

  _createClass(Deck, [{
    key: "getStockData",
    value: function getStockData() {
      var _this3 = this;

      var symbols = "w,f,ba,aapl,fb,jnj";

      var Http = new XMLHttpRequest();
      var url = 'https://cloud.iexapis.com/stable/stock/market/batch?symbols=' + symbols + '&types=quote,chart&range=1d&token=pk_ea3fad39b66c4c08a98acce72eda2aaa';
      Http.open("GET", url);

      Http.onload = function (e) {
        var stockData = JSON.parse(Http.responseText);
        console.log(stockData);
        var stocks = [];
        for (var key in stockData) {
          var name = stockData[key].quote.companyName;
          var price = stockData[key].quote.latestPrice;
          var ticker = stockData[key].quote.symbol;
          var percentChange = (stockData[key].quote.latestPrice - stockData[key].quote.open) / stockData[key].quote.open;
          percentChange = Math.round(percentChange * 100 * 100) / 100;
          var changeType = percentChange >= 0 ? "percentChangeUp" : "percentChangeDown";
          var chartData = [];
          for (var key2 in stockData[key].chart) {
            var dateKey;
            dateKey = stockData[key].chart[key2].date + " " + stockData[key].chart[key2].minute;
            //console.log(Date.parse(stockData[key].chart[key2].date));
            //console.log(Date.parse(dateKey));
            chartData.push({ x: Date.parse(dateKey), y: stockData[key].chart[key2].close });
          }
          console.log(chartData);
          var b = { name: name, price: price, ticker: ticker, percentChange: percentChange, changeType: changeType, chartData: chartData };
          stocks.push(b);
        }
        _this3.setState({ stocks: stocks });
      };

      Http.send();
    }
  }, {
    key: "generateCards",
    value: function generateCards() {
      var stateValues = this.state.stocks;
      var cardsList = stateValues.map(function (s) {
        return React.createElement(Card, { key: s.ticker, name: s.name, price: s.price, percentChange: s.percentChange, changeType: s.changeType, chartData: s.chartData });
      });

      return cardsList;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "deck" },
        this.generateCards()
      );
    }
  }]);

  return Deck;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "createFakeData",
    value: function createFakeData() {
      // This function creates data that doesn't look entirely random
      var data = [];
      for (var x = 0; x <= 30; x++) {
        var random = Math.random();
        var temp = data.length > 0 ? data[data.length - 1].y : 50;
        var y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
        data.push({ x: x, y: y });
      }
      // data = [
      //     {x:0, y:0},
      //     {x:1,y:1},
      //     {x:3,y:-1}
      // ]
      return data;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "App" },
        React.createElement(LineChart, { className: "lineChart", data: this.createFakeData() })
      );
    }
  }]);

  return App;
}(React.Component);

var LineChart = function (_React$Component4) {
  _inherits(LineChart, _React$Component4);

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
    key: "makePath",
    value: function makePath() {
      var _this6 = this;

      var _props = this.props,
          data = _props.data,
          color = _props.color;

      var pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
      pathD += data.map(function (point, i) {
        return "L " + _this6.getSvgX(point.x) + " " + _this6.getSvgY(point.y) + " ";
      });
      return React.createElement("path", { className: "linechart_path", d: pathD, style: { stroke: color } });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          svgHeight = _props2.svgHeight,
          svgWidth = _props2.svgWidth;

      return React.createElement(
        "svg",
        { className: "lineChart", viewBox: "0 0 " + svgWidth + " " + svgHeight },
        this.makePath()
      );
    }
  }]);

  return LineChart;
}(React.Component);

LineChart.defaultProps = {
  data: [{ x: 1, y: 1 }, { x: 2, y: 2 }],
  color: '#2196F3',
  svgHeight: 100,
  svgWidth: 300
};

ReactDOM.render(React.createElement(Deck, null), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();