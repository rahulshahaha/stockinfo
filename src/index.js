//import ApexCharts from 'apexcharts'
const e = React.createElement;

class Card extends React.Component {
 
 render(){
     return(
        <div className="card">
            <h1 className="companyName">{this.props.name}</h1>
            <h6 className="currentPrice">${this.props.price}</h6>
            <h6 className={this.props.changeType}>&nbsp; ({this.props.percentChange}%)</h6>
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
    +symbols+'&types=quote&token=pk_ea3fad39b66c4c08a98acce72eda2aaa';
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

            var b = {name: name,price: price,ticker: ticker,percentChange: percentChange, changeType: changeType};
            stocks.push(b);
        }
       this.setState({stocks: stocks});
        
    }
    
    Http.send();
    
    }
    
    generateCards(){
        var stateValues = this.state.stocks;
        var cardsList = stateValues.map(function(s){
            return <Card key={s.ticker} name={s.name} price={s.price} percentChange={s.percentChange} changeType={s.changeType} />;
        });

        return cardsList;
    }

    render(){
    return <div className="deck">{this.generateCards()}</div>
 }
}

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  var chart = new ApexCharts(document.getElementById("root1"), this.state);
   
  chart.render();
}
}
ReactDOM.render(<Deck />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
