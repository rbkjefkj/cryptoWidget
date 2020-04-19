let myChart;

//FUNCTIONS THAT FETCH DATA FOR GRAPHS
    let prices = [];
    let bogusData = [100, 100, 100, 91, 72, 53, 44, 41, 22, 17, 11, 5, 14, 23, 35, 41, 49, 58, 47, 14, 54, 33, 100, 92, 100, 100, 100];
    let timeRN = Date.now();
    /*fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=EOS&tsym=EUR&limit=90&aggregate=1&toTS=' + timeRN)
        .then((resp) => resp.json())
        .then(function(data) {
            for (let i = 0; i < data.Data.Data.length; i++) {
               console.log(data.Data.Data[i].open + " " + i);
                prices.push(data.Data.Data[i].open); 
            }
        })
        .then(function() {*/
            var ctx = document.getElementById('myChart').getContext('2d'); //instantiates Chart class
            //var gradient = ctx.createLinearGradient(0, 0, 0, 260);
            //gradient.addColorStop(0, 'rgba(0, 0, 77, 1)');
            //gradient.addColorStop(1, 'rgba(0, 0, 77, 0)');    

            let config2 = {
                type: 'line',
                data: {
                labels: bogusData, //prices, //shld be dates
                datasets: [{
                    //label: '',
                    data: bogusData, //prices, //these are the values from API
                    backgroundColor: 'rgba(77, 77, 255, 0.5)',//gradient, /*[ 'rgba(77, 77, 255, 0.5)' //' 0.8)' //'rgba(248, 148, 6, 0.2)'
                    //'rgba(255, 99, 132, 0.2)',
                    //'rgba(54, 162, 235, 0.2)',
                //'rgba(255, 206, 86, 0.2)',
                //'rgba(75, 192, 192, 0.2)',
                //'rgba(153, 102, 255, 0.2)',
                //'rgba(255, 159, 64, 0.2)'
                //],
                borderColor: [ 'rgba(0, 0, 77, 0.2)' //'rgba(248, 148, 6, 1)'
                //'rgba(255, 99, 132, 1)',
                //'rgba(54, 162, 235, 1)',
                //'rgba(255, 206, 86, 1)',
                //'rgba(75, 192, 192, 1)',
                //'rgba(153, 102, 255, 1)',
                //'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                pointStyle: 'rectRot',
                pointRadius: 0,
                lineTension: 0
            }]
        },
    options: {
        legend: {
            position: 'right',
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },
                ticks: { maxRotation: 0, autoSkip: true, autoSkipPadding: 30, labelOffset: 7, fontColor: '#b3b3b3' }
            }],
            yAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },   
                display: false,
                scaleLabel: { display: false }, 
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
}


myChart = new Chart(ctx, config2);

//setTimeout(function(){ var myChart = new Chart(ctx, config); }, 100);


/*function isTrue() { 
    let screenWidth = getWidth();
    if (screenWidth > 520) { above520 = true; return true; } 
    else { above520 = false; return false; } 
}
function getWidth() { 
    return window.innerWidth;
    
}*/

/*function somefunc() {
    let w = getWidth();
    if (above520) { //screen is currently big
        console.log('somefunc ran. Width is above 520')
        if (w <= 520) {
            above520 = false;
            myChart = new Chart(ctx, config2);
        }
    } else { //screen is currently small
        if (w > 520) {
            console.log('somefunc ran. Width is below 520.');
            above520 = true;
            myChart = new Chart(ctx, config);
        }
    }
}
window.onresize = somefunc;*/




let fiat = 'EUR';
let crypto = 'EOS';
let isCalculator = false;

//CALLED ONLOAD
getCurrentPrice2('EUR');


function getCurrentPrice2(fiat) {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=' + crypto + '&tsyms=' + fiat + '&api_key=fd444f02fd13f67cbbbfe6bf9279aa08ca21b36fb99bf2c964790c5b645aa766')
        .then((resp) => resp.json())
        .then(function(data) {
            let price;
            console.log('data is: ' + JSON.stringify(data));
            fiat === 'EUR' ? price = data.EUR.toFixed(2) : price = data.USD.toFixed(2); //chooses price depending on which FIAT is used     
            document.getElementById('span').innerHTML = price;                          //paints price
            fiat === 'EUR' ? document.getElementById('symbol').textContent = '€' : document.getElementById('symbol').textContent = '$' //sets €/$ in title
            document.getElementById('cryptoName').textContent = crypto;                           //sets crypto's name in title
            
            if (isCalculator === true) stopCalculator();
            document.getElementById('frst-input').value = 'from ' + crypto;             //next 2 lines give text 'from CRYPTO to FIAT'
            document.getElementById('scnd-input').value = 'to ' + fiat;
            
        });
}


function stopCalculator() {
     isCalculator = false;
    //Removing CSS
    let spans = document.getElementsByClassName('form-spans');
    let inputs = document.getElementsByClassName('inputs');
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].type = "text"
        inputs[i].style.paddingLeft = "13px";
    }    

    for (let i = 0; i < spans.length; i++) {
        spans[i].style.paddingLeft = "0";
    }        
    document.getElementById('span1').removeChild(document.getElementById('span1').childNodes[0]);
    document.getElementById('span2').removeChild(document.getElementById('span2').childNodes[0]);
    document.getElementById('frst-input').value = 'from ' + crypto;             //next 2 lines give text 'from CRYPTO to FIAT'
    document.getElementById('scnd-input').value = 'to ' + fiat;
}



function toCalculator() {
    isCalculator = true;
    //Making it pretty
    let spans = document.getElementsByClassName('form-spans');
    let inputs = document.getElementsByClassName('inputs');
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].type = "number"
        inputs[i].style.paddingLeft = "8px";
    }    

    for (let i = 0; i < spans.length; i++) {
        spans[i].style.paddingLeft = '13px';
    } 
    //Actually changing text 
    console.log(crypto);    //crypto is undefined if you pass it as arg to function toCalculator();
    let cryptoNode = document.createTextNode(crypto);   
    let fiatNode;   //defining here cos can't inside a ternary statement      
    fiat === 'EUR' ? fiatNode = document.createTextNode('€') : fiatNode = document.createTextNode('$');  
    document.getElementById('frst-input').value = '';   //deleting 'from CRYPTO to FIAT'
    document.getElementById('scnd-input').value = '';    
    let span1 =  document.getElementById('span1');      //just for
    let span2 =  document.getElementById('span2');      //convenience    
    //Checks if there isn't already a text node so that multiple text nodes wouldn't get added w every click    
    if (span1.childNodes[0].nodeType !== 3) {
        span1.insertBefore(cryptoNode, span1.childNodes[0]);
        span2.insertBefore(fiatNode, span2.childNodes[0]);
    }
}


function update(userInput) { 
        let inFIAT = (((document.getElementById('span').innerHTML * 100) * (userInput * 100))/10000).toFixed(2); // inFIAT = current price * user input
        document.getElementById("scnd-input").value = inFIAT;  //assigns that to output
    }

    let firstInput = document.getElementById("frst-input");
    firstInput.oninput =  function() {
        let rex = /\./;
        let str = firstInput.value.toString();    
        if (str.match(rex) === null) {      //if user types an integer
            if (firstInput.value.length > 14) firstInput.value = firstInput.value.slice(0, 14);
        } else firstInput.value = firstInput.value.slice(0, 18);

        let userInput = parseFloat(document.getElementById("frst-input").value);
        update(userInput);
    };


function toUSD() {
    fiat = 'USD';   
    getCurrentPrice2('USD');
    //changeFIATsymbols('USD');
}

function toEUR() {
    fiat = 'EUR'
    getCurrentPrice2('EUR');
    //changeFIATsymbols('EUR');   
}

function toEOS() {
    crypto = 'EOS'
    getCurrentPrice2(fiat);
    //changeFIATsymbols('EUR');   
}

function toBTC() {
    crypto = 'BTC'
    getCurrentPrice2(fiat);
    //changeFIATsymbols('EUR');   
}




//DON'T DELETE:    https://min-api.cryptocompare.com/data/v2/histoday?fsym=EOS&tsym=EUR&limit=90&aggregate=1&toTS=TIMEstampRIGHTNOW
