//FUNCTIONS THAT FETCH DATA FOR GRAPHS
    let prices = [];
    let bogusData = [12, 21, 26, 31, 45, 37, 33, 44, 41, 22, 17, 11, 5, 14, 23, 35, 41, 49, 58, 47, 14, 54, 33, 100, 92, 100, 100, 100, 100, 100, 100, 100, 100];
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
            
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: bogusData, //prices, //shld be dates
            datasets: [{
                //label: '',
                data: bogusData, //prices, //these are the values from API
                backgroundColor: 'rgba(0, 0, 0, 0.1)',//gradient, /*[ 'rgba(77, 77, 255, 0.5)' //' 0.8)' //'rgba(248, 148, 6, 0.2)'
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
                }
            }],
            yAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },    
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});
       // })
//*/


function getCurrentPrice(fiat) {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=EOS&tsyms=' + fiat + '&api_key=fd444f02fd13f67cbbbfe6bf9279aa08ca21b36fb99bf2c964790c5b645aa766')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log('data is: ' + JSON.stringify(data));
            let price;
            fiat === 'EUR' ? price = data.EUR.toFixed(2) : price = data.USD.toFixed(2);     
            document.getElementById('span').innerHTML = price;
            /*if span1 (or 2 or both doesnt matter) contains a text node(or check w a regex), then frst-input and scnd-input types need to be changed to text and span inner textnode needs
            to be deleted and THEN run the two following lines. And u might wanna put this funcitonality in a function for sensibility. OK this is ***********/
                    
            let innerH = document.getElementById('span1').innerHTML;
            let result = innerH.match(/EOS</); //or BTC
            if (result === null) {
                let crypto;
                crypto = document.createTextNode('EOS');
                let fiat;
                currentFIAT === 'EUR' ? fiat = document.createTextNode('€') : fiat = document.createTextNode('$');  
                document.getElementById('span1').insertBefore(crypto, input);
                document.getElementById('span2').insertBefore(fiat, output);
            }/* else  { does not work
                document.getElementById('span1').innerHTML = '<input class="inputs" id="frst-input" type="text" spellcheck="false" onclick="changeInput()">';
                document.getElementById('span2').innerHTML = '<input class="inputs" id="scnd-input" type="text" spellcheck="false" onclick="changeInput()">';
            }*/

            document.getElementById('frst-input').value = `from EOS`; //dsnt work cos by now input type is number and span doesnt remove its inner textnode
            document.getElementById('scnd-input').value = `to ${fiat}`;
            
        })

/*Catch errors somehow
    .catch(function() {
         document.getElementById('h1').innerHTML = 'Something went wrong while fetching EOS price';
    });*/
}

//DON'T DELETE:    https://min-api.cryptocompare.com/data/v2/histoday?fsym=EOS&tsym=EUR&limit=90&aggregate=1&toTS=TIMEstampRIGHTNOW

//CALCULATOR FUNCTIONS 
    let input = document.getElementById("frst-input");
    let output = document.getElementById("scnd-input");
    var currentFIAT = 'EUR';
 
    function changeInput() {
        
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
         
        //make this a function proly   
        let innerH = document.getElementById('span1').innerHTML;
        let result = innerH.match(/EOS</); //or BTC
        if (result === null) {
            let crypto;
            crypto = document.createTextNode('EOS');
            let fiat;
            currentFIAT === 'EUR' ? fiat = document.createTextNode('€') : fiat = document.createTextNode('$');  
            document.getElementById('span1').insertBefore(crypto, input);
            document.getElementById('span2').insertBefore(fiat, output);
        }//here it ends
    }

    function update(userInput) {
        let inFIAT = (document.getElementById('span').innerHTML * userInput).toFixed(2);
        output.value = inFIAT;
    }

    input.oninput =  function(){
        let userInput = parseFloat(input.value);
        update(userInput);
    };

//DIFFERENT TAB FUNCTIONS
function changeFIATsymbols(fiat) {
    if (fiat === 'EUR') {
        document.getElementById('symbol').textContent = '€';
        currentFIAT = 'EUR';
    } else if (fiat === 'USD') {
        document.getElementById('symbol').textContent = '$';
        currentFIAT = 'USD';
    }    
    //document.getElementById('scnd-input').type = 'text';   
    document.getElementById('scnd-input').value = `to ${currentFIAT}`;
}

function toUSD() {   
    getCurrentPrice('USD');
    changeFIATsymbols('USD');
}

function toEUR() {
    getCurrentPrice('EUR');
    changeFIATsymbols('EUR');   
}

//CALLED ONLOAD
getCurrentPrice('EUR');

