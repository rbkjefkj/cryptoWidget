let myChart;

//FUNCTIONS THAT FETCH DATA FOR GRAPHS
function getTime() {
	return Date.now();
}
	
let fiat = 'EUR';
let crypto = 'EOS';
let isCalculator = false;
	
getCurrentPrice2('EUR'); //gets called onload

function makeDateForHumans(time) {
	let d = new Date(time);
	let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return `${months[d.getMonth()]} ${d.getDate()}`;
}

function removeFailedAPI() {
    document.getElementById('myChart').style.display = 'block';
    if (document.getElementById('chart-container-img'))	document.getElementById('chart-container-img').style.display = 'none';
    document.getElementById('scnd-input').style.backgroundColor = 'lightgrey';
    document.getElementById('span2').style.backgroundColor = 'lightgrey';
}

function getCurrentPrice2(fiat) {
    removeFailedAPI();
	let prices = [];
    let dates = [];
    let timeRN = getTime();
    fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=' + crypto + '&tsym=' + fiat + '&limit=90&aggregate=1&toTS=' + timeRN)
    	.then((res) => res.json())
        .then(function(data) {
           	//data.Data.Data
			let ninetyDaysAgo = timeRN - 7776000000; //makes timestamp for the day that was 90 days ago
            for (let piece of data.Data.Data) {
           		prices.push(piece.close.toFixed(2));
            	dates.push(makeDateForHumans(ninetyDaysAgo));
				ninetyDaysAgo = ninetyDaysAgo + 86400000; //adds the next day
            }
            let price = prices[prices.length-1];
            styleCryptoPrice(data);
            try {
            	//fiat === 'EUR' ? price = data.EUR.toFixed(2) : price = data.USD.toFixed(2); //chooses price depending on which FIAT is used
                document.getElementById('span').textContent = price;                          //paints price
                fiat === 'EUR' ? document.getElementById('symbol').textContent = '€' : document.getElementById('symbol').textContent = '$' //sets €/$ in title
                document.getElementById('cryptoName').textContent = crypto;                           //sets crypto's name in title

                if (isCalculator === true) stopCalculator();
                document.getElementById('frst-input').value = 'from '  + crypto;             //next 2 lines give text 'from CRYPTO to FIAT'
                document.getElementById('scnd-input').value = 'to ' + fiat;
           	} catch(err) {
            	document.getElementById('failedAPI').style.display = "block";
            }
        })
        	.then(function() {
            	var ctx = document.getElementById('myChart').getContext('2d'); //instantiates Chart class

            	//HOW TO MAKE A GRADIENT
            	//var gradient = ctx.createLinearGradient(0, 0, 0, 260);
            	//gradient.addColorStop(0, 'rgba(0, 0, 77, 1)');
            	//gradient.addColorStop(1, 'rgba(0, 0, 77, 0)');

            	let config2 = {
                	type: 'line',
                	data: {
                		labels: dates,
                		datasets: [{
                    		//label: '',
                    		data: prices, //these are the values from API
                    		backgroundColor: 'rgba(77, 77, 255, 0.5)',
                			borderColor: [ 'rgba(0, 0, 77, 0.2)' ],
                			borderWidth: 1,
                			pointStyle: 'star',
                			pointRadius: 3,
                      		pointBorderColor: 'rgba(77, 77, 255, 0.5)',
                			lineTension: 0
            			}]
        			},
    				options: {
        				legend: { position: 'right', display: false },
        				scales: {
            				xAxes: [{
                				gridLines: { drawOnChartArea: false, drawTicks: false },
                				ticks: { display: false, maxRotation: 0, autoSkip: true, autoSkipPadding: 30, labelOffset: 7, fontColor: "white"/*'#b3b3b3'*/ }
            				}],
            				yAxes: [{
                				gridLines: { drawOnChartArea: false },
                				display: false,
                				scaleLabel: { display: false },
                				ticks: { display: false, min: 0 }
            				}]
        				}
    				}
				}// end of config2

                if (myChart) myChart.destroy(); //prevents chart flickering glitch
				myChart = new Chart(ctx, config2);
			})//canvas drawing function ends
			.catch (function(err) { //runs if API call failed
				document.getElementById('myChart').style.display = 'none';
				document.getElementById('frst-input').value = 'Something went wrong...';
				document.getElementById('scnd-input').value = "･*:.✧｡◉.✿:｡･:*:･ﾟ’★,｡･:*:✧･ﾟ’☆◉.｡.✧:*･゜ﾟ･✿*☆･*:.✧｡◉.✿:｡･:*:･ﾟ’★,｡:*:✧";
                		document.getElementById('scnd-input').style.backgroundColor = 'hotpink';
                		document.getElementById('span2').style.backgroundColor = 'hotpink';
                		document.getElementById('symbol').textContent = '';
                		document.getElementById('span').textContent = '¯\\_(ツ)_/¯';
                		document.getElementById('span').classList.add('six-digit-spans');
			});
}//the entire getCurrentPrice2() ends


function styleCryptoPrice(data) {
    let stringifiedPrice = JSON.stringify(data);
    let rex = /[0-9]*\./;
    let result = stringifiedPrice.match(rex);
    if (result === null) return;
    if (result[0].length === 5) {   //crypto price is 6 digits long
        document.getElementById('span').classList.add('six-digit-spans');
        document.getElementById('symbol').classList.add('six-digit-spans');
        document.getElementById('h1').classList.add('six-digit-h1');
        return;
    }

    else if (result[0].length < 5) { //crypto price is of normal length
        document.getElementById('span').classList.remove('six-digit-spans', 'seven-digit-spans');
        document.getElementById('symbol').classList.remove('six-digit-spans', 'seven-digit-spans');
        document.getElementById('h1').classList.remove('six-digit-h1', 'seven-digit-h1');
        return;
    }
    else if (result[0].length === 6) {  //crypto price is 7 digits long
        document.getElementById('span').classList.remove('six-digit-spans');
        document.getElementById('span').classList.add('seven-digit-spans');
        document.getElementById('symbol').classList.remove('six-digit-spans');
        document.getElementById('symbol').classList.add('seven-digit-spans');
        document.getElementById('h1').classList.remove('six-digit-h1');
        document.getElementById('h1').classList.add('seven-digit-h1');
    }
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

//TOP SECRET: 'https://min-api.cryptocompare.com/data/price?fsym=' + crypto + '&tsyms=' + fiat + '&api_key=fd444f02fd13f67cbbbfe6bf9279aa08ca21b36fb99bf2c964790c5b645aa766'

