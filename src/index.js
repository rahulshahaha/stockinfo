


class Card extends React.Component {
 
 render(){
     return(
        <div className="card">
            <h1 className="companyName">{this.props.name}</h1>
            <h6 className="currentPrice">${this.props.price}</h6>
            <h6 className={this.props.changeType}>&nbsp; ({this.props.percentChange}%)</h6>
            <Chart chartData = {this.props.chartData} />
        </div>
     )
 }
}

class Chart extends React.Component {
 
    generateChart(){
        console.log(this.props.chartData);
        var data = this.props.chartData;
        var minX = 0, maxX = 0, minY = 0, maxY = 0;

        for(key in data){
            if(minX == 0){
                minX = data[key].x;
            }
            if(data[key].x < minX){
                minX = data[key].x;
            }
        }
        for(key in data){
            if(maxX == 0){
                maxX = data[key].x;
            }
            if(data[key].x > maxX){
                maxX = data[key].x;
            }
        }
        for(key in data){
            if(minY == 0){
                minY = data[key].y;
            }
            if(data[key].y < minY){
                minY = data[key].y;
            }
        }
        for(key in data){
            if(maxY == 0){
                maxY = data[key].y;
            }
            if(data[key].y > maxY){
                maxY = data[key].y;
            }
        }
        
        var averageY = (maxY + minY) / 2;

        var coordinatesList = data.map(function(d){
            var xCoordinate = ((d.x - minX) / (maxX - minX)) * 300;
            xCoordinate = xCoordinate.toString();

            var yCoordinate = ((d.y - minY) / (maxY - minY)) * 100;
            yCoordinate = yCoordinate.toString();

           // console.log(xCoordinate + "," + yCoordinate);
            return xCoordinate + "," + yCoordinate;
            
        });
        //console.log(coordinatesList);

        var coordinates = "";

        for(point in coordinatesList){
            coordinates = coordinates + coordinatesList[point] + " ";
            //console.log(point);
        }
        return coordinates;
    }

    render(){
        return(
            <svg className="chart">
            <polyline
                className = "chartLine"
               fill="none"
               stroke="#0074d9"
               strokeWidth="1"
               points={this.generateChart()}/>
          </svg>
        )
    };
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
                if(stockData[key].chart[key2].close != null){
                chartData.push({x: Date.parse(dateKey), y: stockData[key].chart[key2].close})
                }
            }
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

Card.defaultProps = {
    chartData:[
        {x:1,y:1},
        {x:2,y:2},
        {x:3,y:1},
        {x:4,y:0}
    ]
  };


ReactDOM.render(<Deck />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
