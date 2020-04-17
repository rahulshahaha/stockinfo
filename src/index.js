


class Card extends React.Component {


 
 render(){
     var percentUp = (this.props.price - this.props.priceBought) / this.props.priceBought;
     percentUp = percentUp * 100;
     percentUp = percentUp.toFixed(2);
     var dollarsUp = (this.props.price * this.props.quantity) - (this.props.priceBought * this.props.quantity);
     dollarsUp = dollarsUp.toFixed(2);
     var perfromanceClass = "overallPerformanceUp";
     if(dollarsUp < 0){
        perfromanceClass = "overallPerformanceDown";
     }
     return(
        <div className="card">
            <h1 className="companyName">{this.props.name}</h1>
            <h6 className="currentPrice">${this.props.price}</h6>
            <h6 className={this.props.changeType}>&nbsp; ({this.props.percentChange}%)</h6>
            <h6 className="overall">Overall:&nbsp;</h6>
            <h6 className={perfromanceClass}>${dollarsUp}&nbsp;({percentUp}%)</h6>
            <Chart chartData = {this.props.chartData} width={this.props.width} height={this.props.height} />
        </div>
     )
 }
}

class Chart extends React.Component {
 
    generateChart(){
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
        

        var width;
        if(width >= 750){
        width = this.props.width * 0.24;
        }else if(width >= 375){
            width = this.props.width * 0.49;
        }else{
            width = this.props.width * 0.99;
        }
        var height = this.props.height * 0.10;

        var coordinatesList = data.map(function(d){
            var xCoordinate = ((d.x - minX) / (maxX - minX)) * width;
            xCoordinate = xCoordinate.toString();

            var yCoordinate = ((maxY - d.y) / (maxY - minY)) * height;
            yCoordinate = yCoordinate.toString();
            return xCoordinate + "," + yCoordinate;
            
        });

        var coordinates = "";

        for(point in coordinatesList){
            coordinates = coordinates + coordinatesList[point] + " ";
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
            symbols: "",
            stocks:[

            ],
            currentholdings:[
                {ticker: "w",quantity: 47, price: 120.4},
                {ticker: "cgc",quantity: 10, price: 47.4},
                {ticker: "corr",quantity: 38, price: 39.28},
                {ticker: "jnj",quantity: 7, price: 129.5},
                {ticker: "rok",quantity: 6, price: 159.75},
                {ticker: "work",quantity: 73, price: 35.28},
                {ticker: "spy",quantity: 11, price: 280.35},
                {ticker: "v",quantity: 7, price: 145.14}
            ],
            width: window.innerWidth,
            height: window.innerHeight
        };
        //this.getStockData();
        window.addEventListener("resize", this.windowResized.bind(this));
      }



      windowResized(){
       

        this.setState(
            {
                width: window.innerWidth,
                height: window.innerHeight
            });
      }

    getStockData(symbols){
        // var symbols = "jnj,cgc,work,v,spy,rok,w,corr";
        // var symbols = this.state.symbols;
    
    
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
            var percentChange = (stockData[key].quote.latestPrice - stockData[key].quote.previousClose) / stockData[key].quote.previousClose;
            percentChange = Math.round(percentChange * 100 * 100) / 100;
            var changeType = percentChange >= 0 ? "percentChangeUp" : "percentChangeDown";
            var chartData = [];
            var lastValidKey = 0;
            for(var key2 in stockData[key].chart){
                var dateKey;
                dateKey = stockData[key].chart[key2].date + " " + stockData[key].chart[key2].minute;
                if(stockData[key].chart[key2].close != null){
                chartData.push({x: Date.parse(dateKey), y: stockData[key].chart[key2].close})
                lastValidKey = key2;
                }else{
                    if(lastValidKey != 0){
                    chartData.push({x: Date.parse(dateKey), y: stockData[key].chart[lastValidKey].close})   
                    }
                }
            }
            var b = {name: name,price: price,ticker: ticker,percentChange: percentChange, changeType: changeType, chartData: chartData};
            stocks.push(b);
        }
       this.setState({
           stocks: stocks
        });
        
    }
    
    Http.send();
    
    }
    
    generateCards(){
        var stateValues = this.state.stocks;
        var currentHoldings = this.state.currentholdings;
        var heightS = this.state.height;
        var widthS = this.state.width;
        var cardsList = stateValues.map(function(s){
            var quantity = 0;
            var priceBought = 0;
            for(var key in currentHoldings){
                if(currentHoldings[key].ticker.toLowerCase() == s.ticker.toLowerCase()){
                    quantity = currentHoldings[key].quantity;
                    priceBought = currentHoldings[key].price;
                }
            }
            return <Card key={s.ticker} name={s.name} price={s.price} percentChange={s.percentChange} changeType={s.changeType} chartData={s.chartData} height={heightS} width={widthS} quantity={quantity} priceBought={priceBought} />;
        });

        return cardsList;
    }

    activateLasers(){
        var ticker = document.getElementById("ticker").value;
        var quantity = document.getElementById("quantity").value;
        var price = document.getElementById("price").value;
        var current = this.state.currentholdings;
        var updated = 0;
        for(var key in current){
            if(current[key].ticker.toLowerCase() == ticker.toLowerCase()){
                current[key].quantity = quantity;
                current[key].price = price;
                updated = 1;
            }
        }
        if(updated == 0){        
        current.push({ticker: ticker,quantity: quantity,price: price})
        }

        this.setState({
            currentholdings: current
         });
        document.getElementById("ticker").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("price").value = "";
        document.getElementById("ticker").focus();
        document.getElementById("ticker").select();
         
    }

    symbolsEntered(){
        var symbols = document.getElementById("symbols").value
        this.setState({
            symobls: symbols
        });
        this.getStockData(symbols);
    }

    render(){
    return (
        <div className="deck">
            {this.generateCards()}
            <input type="text" id="ticker" placeholder="Ticker"></input>
            <input type="number" id="price" placeholder="Price"></input>
            <input type="number" id="quantity" placeholder="Quantity"></input>
            <button onClick={() => {this.activateLasers()}}>submit</button>
            <input type="text" id="symbols" defaultValue="jnj,cgc,work,v,spy,rok,w,corr"></input>
            <button onClick={() => {this.symbolsEntered()}}>submit</button>
        </div>

    )
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