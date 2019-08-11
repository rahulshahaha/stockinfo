var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

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
        //this.getStockData();
        return _this2;
    }

    _createClass(Deck, [{
        key: "getStockData",
        value: function getStockData() {
            var _this3 = this;

            var symbols = "w,f,ba,aapl,fb,jnj";

            var Http = new XMLHttpRequest();
            var url = 'https://cloud.iexapis.com/stable/stock/market/batch?symbols=' + symbols + '&types=quote&token=pk_ea3fad39b66c4c08a98acce72eda2aaa';
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

                    var b = { name: name, price: price, ticker: ticker, percentChange: percentChange, changeType: changeType };
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
                return React.createElement(Card, { key: s.ticker, name: s.name, price: s.price, percentChange: s.percentChange, changeType: s.changeType });
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

ReactDOM.render(React.createElement(Deck, null), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();