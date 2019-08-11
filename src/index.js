


class Card extends React.Component {
 
 render(){
     return(
        <div className="card">
            <h1 className="companyName">{this.props.name}</h1>
            <h6 className="currentPrice">${this.props.price}</h6>
            <h6 className={this.props.changeType}>&nbsp; ({this.props.percentChange}%)</h6>
            <div><App chartData ={this.props.chartData}/></div>
        </div>
     )
 }
}

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            stocks:[
                {ticker: "sfdfsd",name: "Very Long Company Name Incorporated", price: 123, percentChange: 4, changeType: "percentChangeUp"},
                {ticker: "W",name: "Wayfair, Inc.", price: 123, percentChange: -2, changeType: "percentChangeDown"},
                {ticker: "B",name: "B", price: 123},
                {ticker: "C",name: "C", price: 123},
                {ticker: "D",name: "D", price: 123},
                {ticker: "E",name: "E", price: 123},
                {ticker: "F",name: "F", price: 123},
                {ticker: "G",name: "G", price: 123}
            ]
        };
          this.getStockData();
      }

    getStockData(){
        var symbols = "w,f,ba,aapl,fb,jnj";
    
    
    
    const Http = new XMLHttpRequest();
    const url='https://cloud.iexapis.com/stable/stock/market/batch?symbols='
    +symbols+'&types=quote,chart&range=1d&token=pk_ea3fad39b66c4c08a98acce72eda2aaa';
    Http.open("GET", url);
    
    
    Http.onload = (e) => {
        var stockData = JSON.parse(Http.responseText);
        console.log(stockData);
        var stocks = [];
        for(var key in stockData){
            var name = stockData[key].quote.companyName;
            var price = stockData[key].quote.latestPrice;
            var ticker = stockData[key].quote.symbol;
            var percentChange = (stockData[key].quote.latestPrice - stockData[key].quote.open) / stockData[key].quote.open;
            percentChange = Math.round(percentChange * 100 * 100) / 100;
            var changeType = percentChange >= 0 ? "percentChangeUp" : "percentChangeDown";
            var chartData = [];
            for(var key2 in stockData[key].chart){
                var dateKey;
                dateKey = stockData[key].chart[key2].date + " " + stockData[key].chart[key2].minute;
                //console.log(Date.parse(stockData[key].chart[key2].date));
                //console.log(Date.parse(dateKey));
                chartData.push({x: Date.parse(dateKey), y: stockData[key].chart[key2].close})
            }
            console.log(chartData);
            var b = {name: name,price: price,ticker: ticker,percentChange: percentChange, changeType: changeType, chartData: chartData};
            stocks.push(b);
        }
       this.setState({stocks: stocks});
        
    }
    
    Http.send();
    
    }
    
    generateCards(){
        var stateValues = this.state.stocks;
        var cardsList = stateValues.map(function(s){
            return <Card key={s.ticker} name={s.name} price={s.price} percentChange={s.percentChange} changeType={s.changeType} chartData={s.chartData} />;
        });

        return cardsList;
    }

    render(){
    return <div className="deck">{this.generateCards()}</div>
 }
}


class App extends React.Component {
  createFakeData(){
    // This function creates data that doesn't look entirely random
    var data = []
    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    // data = [
    //     {x:0, y:0},
    //     {x:1,y:1},
    //     {x:3,y:-1}
    // ]
    return data;
  }
  render() {
    return (
      <div className="App">
        <LineChart className="lineChart" data={this.createFakeData()} />
      </div>
    );
  }
}

class LineChart extends React.Component {

    // GET MAX & MIN X
    getMinX() {
        const {data} = this.props;
        return data[0].x;
      }
      getMaxX() {
        const {data} = this.props;
        return data[data.length - 1].x;
      }
      // GET MAX & MIN Y
      getMinY() {
        const {data} = this.props;
        return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
      }
      getMaxY() {
        const {data} = this.props;
        return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
      }
    
      getSvgX(x) {
        const {svgWidth} = this.props;
        return (x / this.getMaxX() * svgWidth);
      }
      getSvgY(y) {
        const {svgHeight} = this.props;
        return svgHeight - (y / this.getMaxY() * svgHeight);
      }
    
      makeAxis() {
        const minX = this.getMinX(), maxX = this.getMaxX();
        const minY = this.getMinY(), maxY = this.getMaxY();
      return (
          <g className="linechart_axis">
            <line
              x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
              x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
            <line
              x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
              x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
          </g>
          );
        }
        makePath() {
            const {data, color} = this.props;
            let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
        pathD += data.map((point, i) => {
              return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
            });
        return (
          <path className="linechart_path" d={pathD} style={{stroke: color}} />
            );
          }
        render() {
            const {svgHeight, svgWidth} = this.props;
        return (
              <svg className = "lineChart" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {this.makePath()}
                {/* {this.makeAxis()} */}
              </svg>
            );
          }
    }
    LineChart.defaultProps = {
      data: [
          {x: 1, y:1},
          {x:2, y:2}
      ],  
      color: '#2196F3',  
      svgHeight: 100,  
      svgWidth: 300
    }




ReactDOM.render(<Deck />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
