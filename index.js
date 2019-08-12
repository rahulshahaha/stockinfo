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
                React.createElement(Chart, { chartData: this.props.chartData })
            );
        }
    }]);

    return Card;
}(React.Component);

var Chart = function (_React$Component2) {
    _inherits(Chart, _React$Component2);

    function Chart() {
        _classCallCheck(this, Chart);

        return _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).apply(this, arguments));
    }

    _createClass(Chart, [{
        key: "generateChart",
        value: function generateChart() {
            console.log(this.props.chartData);
            var data = this.props.chartData;
            var minX = 0,
                maxX = 0,
                minY = 0,
                maxY = 0;

            for (key in data) {
                if (minX == 0) {
                    minX = data[key].x;
                }
                if (data[key].x < minX) {
                    minX = data[key].x;
                }
            }
            for (key in data) {
                if (maxX == 0) {
                    maxX = data[key].x;
                }
                if (data[key].x > maxX) {
                    maxX = data[key].x;
                }
            }
            for (key in data) {
                if (minY == 0) {
                    minY = data[key].y;
                }
                if (data[key].y < minY) {
                    minY = data[key].y;
                }
            }
            for (key in data) {
                if (maxY == 0) {
                    maxY = data[key].y;
                }
                if (data[key].y > maxY) {
                    maxY = data[key].y;
                }
            }

            var averageY = (maxY + minY) / 2;

            var coordinatesList = data.map(function (d) {
                var xCoordinate = (d.x - minX) / (maxX - minX) * 300;
                xCoordinate = xCoordinate.toString();

                var yCoordinate = (d.y - minY) / (maxY - minY) * 100;
                yCoordinate = yCoordinate.toString();

                // console.log(xCoordinate + "," + yCoordinate);
                return xCoordinate + "," + yCoordinate;
            });
            //console.log(coordinatesList);

            var coordinates = "";

            for (point in coordinatesList) {
                coordinates = coordinates + coordinatesList[point] + " ";
                //console.log(point);
            }
            return coordinates;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "svg",
                { className: "chart" },
                React.createElement("polyline", {
                    className: "chartLine",
                    fill: "none",
                    stroke: "#0074d9",
                    strokeWidth: "1",
                    points: this.generateChart() })
            );
        }
    }]);

    return Chart;
}(React.Component);

var Deck = function (_React$Component3) {
    _inherits(Deck, _React$Component3);

    function Deck(props) {
        _classCallCheck(this, Deck);

        var _this3 = _possibleConstructorReturn(this, (Deck.__proto__ || Object.getPrototypeOf(Deck)).call(this, props));

        _this3.state = {
            stocks: [{ ticker: "sfdfsd", name: "Very Long Company Name Incorporated", price: 123, percentChange: 4, changeType: "percentChangeUp" }, { ticker: "W", name: "Wayfair, Inc.", price: 123, percentChange: -2, changeType: "percentChangeDown" }, { ticker: "B", name: "B", price: 123 }, { ticker: "C", name: "C", price: 123 }, { ticker: "D", name: "D", price: 123 }, { ticker: "E", name: "E", price: 123 }, { ticker: "F", name: "F", price: 123 }, { ticker: "G", name: "G", price: 123 }]
        };
        _this3.getStockData();
        return _this3;
    }

    _createClass(Deck, [{
        key: "getStockData",
        value: function getStockData() {
            var _this4 = this;

            var symbols = "jnj,corr,cgc,work,v,spy,rok,w";

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
                        if (stockData[key].chart[key2].close != null) {
                            chartData.push({ x: Date.parse(dateKey), y: stockData[key].chart[key2].close });
                        }
                    }
                    var b = { name: name, price: price, ticker: ticker, percentChange: percentChange, changeType: changeType, chartData: chartData };
                    stocks.push(b);
                }
                _this4.setState({ stocks: stocks });
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

Card.defaultProps = {
    chartData: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 4, y: 0 }]
};

ReactDOM.render(React.createElement(Deck, null), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();