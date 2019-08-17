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
            var percentUp = (this.props.price - this.props.priceBought) / this.props.priceBought;
            percentUp = percentUp * 100;
            percentUp = percentUp.toFixed(2);
            var dollarsUp = this.props.price * this.props.quantity - this.props.priceBought * this.props.quantity;
            dollarsUp = dollarsUp.toFixed(2);
            var perfromanceClass = "overallPerformanceUp";
            if (dollarsUp < 0) {
                perfromanceClass = "overallPerformanceDown";
            }
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
                    "h6",
                    { className: "overall" },
                    "Overall:\xA0"
                ),
                React.createElement(
                    "h6",
                    { className: perfromanceClass },
                    "$",
                    dollarsUp,
                    "\xA0(",
                    percentUp,
                    "%)"
                ),
                React.createElement(Chart, { chartData: this.props.chartData, width: this.props.width, height: this.props.height })
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

            var width;
            if (width >= 750) {
                width = this.props.width * 0.24;
            } else if (width >= 375) {
                width = this.props.width * 0.49;
            } else {
                width = this.props.width * 0.99;
            }
            var height = this.props.height * 0.10;

            var coordinatesList = data.map(function (d) {
                var xCoordinate = (d.x - minX) / (maxX - minX) * width;
                xCoordinate = xCoordinate.toString();

                var yCoordinate = (maxY - d.y) / (maxY - minY) * height;
                yCoordinate = yCoordinate.toString();
                return xCoordinate + "," + yCoordinate;
            });

            var coordinates = "";

            for (point in coordinatesList) {
                coordinates = coordinates + coordinatesList[point] + " ";
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
            stocks: [{ ticker: "sfdfsd", name: "Very Long Company Name Incorporated", price: 123, percentChange: 4, changeType: "percentChangeUp" }, { ticker: "W", name: "Wayfair, Inc.", price: 123, percentChange: -2, changeType: "percentChangeDown" }, { ticker: "B", name: "B", price: 123 }, { ticker: "C", name: "C", price: 123 }, { ticker: "D", name: "D", price: 123 }, { ticker: "E", name: "E", price: 123 }, { ticker: "F", name: "F", price: 123 }, { ticker: "G", name: "G", price: 123 }],
            currentholdings: null,
            // currentholdings:[
            //     {ticker: "w",quantity: 47, price: 120.4},
            //     {ticker: "cgc",quantity: 10, price: 47.4},
            //     {ticker: "corr",quantity: 38, price: 39.28},
            //     {ticker: "jnj",quantity: 7, price: 129.5},
            //     {ticker: "rok",quantity: 6, price: 159.75},
            //     {ticker: "work",quantity: 73, price: 35.28},
            //     {ticker: "spy",quantity: 11, price: 280.35},
            //     {ticker: "v",quantity: 7, price: 145.14}
            // ],
            width: window.innerWidth,
            height: window.innerHeight
        };
        _this3.getStockData();
        window.addEventListener("resize", _this3.windowResized.bind(_this3));
        return _this3;
    }

    _createClass(Deck, [{
        key: "windowResized",
        value: function windowResized() {

            this.setState({
                stocks: this.state.stocks,
                width: window.innerWidth,
                height: window.innerHeight,
                currentholdings: this.state.currentholdings
            });
        }
    }, {
        key: "getStockData",
        value: function getStockData() {
            var _this4 = this;

            var symbols = "jnj,cgc,work,v,spy,rok,w,corr";

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
                    var percentChange = (stockData[key].quote.latestPrice - stockData[key].quote.previousClose) / stockData[key].quote.previousClose;
                    percentChange = Math.round(percentChange * 100 * 100) / 100;
                    var changeType = percentChange >= 0 ? "percentChangeUp" : "percentChangeDown";
                    var chartData = [];
                    var lastValidKey = 0;
                    for (var key2 in stockData[key].chart) {
                        var dateKey;
                        dateKey = stockData[key].chart[key2].date + " " + stockData[key].chart[key2].minute;
                        if (stockData[key].chart[key2].close != null) {
                            chartData.push({ x: Date.parse(dateKey), y: stockData[key].chart[key2].close });
                            lastValidKey = key2;
                        } else {
                            if (lastValidKey != 0) {
                                chartData.push({ x: Date.parse(dateKey), y: stockData[key].chart[lastValidKey].close });
                            }
                        }
                    }
                    var b = { name: name, price: price, ticker: ticker, percentChange: percentChange, changeType: changeType, chartData: chartData };
                    stocks.push(b);
                }
                _this4.setState({
                    stocks: stocks,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    currentholdings: _this4.state.currentholdings
                });
            };

            Http.send();
        }
    }, {
        key: "generateCards",
        value: function generateCards() {
            var stateValues = this.state.stocks;
            var currentHoldings = this.state.currentholdings;
            var heightS = this.state.height;
            var widthS = this.state.width;
            var cardsList = stateValues.map(function (s) {
                var quantity = 0;
                var priceBought = 0;
                for (var key in currentHoldings) {
                    if (currentHoldings[key].ticker.toLowerCase() == s.ticker.toLowerCase()) {
                        quantity = currentHoldings[key].quantity;
                        priceBought = currentHoldings[key].price;
                    }
                }
                return React.createElement(Card, { key: s.ticker, name: s.name, price: s.price, percentChange: s.percentChange, changeType: s.changeType, chartData: s.chartData, height: heightS, width: widthS, quantity: quantity, priceBought: priceBought });
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