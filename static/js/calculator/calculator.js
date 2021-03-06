var sensitivityChart = null;

var option_dropdown = null;
var xvar_dropdown = null;
var yvar_dropdown = null;

var n_increments = null;
var n_options = null;
var options = null;
var names = null;

var colors = [
	'rgba(255,0,0)',
 	'rgba(0,255,0)',
 	'rgba(0,0,255)',
 	'rgba(255,255,0)',
 	'rgba(0,255,255)',
 	'rgba(255,0,255)',
 	'rgba(192,192,192)',
 	'rgba(128,128,128)',
 	'rgba(128,0,0)',
 	'rgba(128,128,0)',
 	'rgba(0,128,0)',
 	'rgba(128,0,128)',
 	'rgba(0,128,128)',
 	'rgba(0,0,128)'
 ];

 var factors = [
 	1,
 	1,
 	100,
 	365,
 	100,
 	100
 ]

 //////////////////////////////////////////////////////////////////////////////////////////////////

function init(greeks){

	option_dropdown = $("#optionSelect");
	xvar_dropdown = $("#xSelect");
	yvar_dropdown = $("#ySelect");

	n_increments = greeks['n_increments'];
	n_options = greeks['n_options'];
	options = greeks['options'];
	names = greeks['names'];

	option_dropdown.change(updateChart);
	xvar_dropdown.change(updateChart);
	yvar_dropdown.change(updateChart);

	updateChart();

}

function initChart(){

	var ctx = document.getElementById('sensitivityChart').getContext('2d');
	sensitivityChart = new Chart(ctx, {
		
		type: 'line',
		
		data: {
			datasets: []
		},
		options: {
			
			title: {
				display:true,
				text:"Sensitivity Chart",
				position:"top"
			},

			legend: {
				display:true
			},

			tooltips: {
				enabled:false,
				mode: "y",
				bodyFontStyle: 'bold',
				callbacks: {}
			},

			elements: {
				
				point: {
					enabled:false,
					radius:0,
					hitRadius:10,
					hoverRadius:0,
					pointStyle:'circle'
				},

			},

			scales: {

				xAxes: [{
					
					type: 'linear',
					position: 'bottom',

					scaleLabel: {
						display: true,
						labelString: '',
						fontStyle: "bold",
						fontSize: 14
					},

					ticks: {}

				}],

				yAxes: [{
					
					scaleLabel: {
						display: true,
						labelString: '',
						fontStyle: "bold",
						fontSize: 14
					},

					gridLines: {}

				}]

			}
		}

	});
}

function updateChart(){

	let oids = option_dropdown.val();
	let xvar = xvar_dropdown.val();
	let yvar = yvar_dropdown.val();

	sensitivityChart.data.datasets = [];

	oids.forEach( (oid, idx) => {

		row_offset = oid * n_increments * 6 + n_increments * xvar;

		let data = [];
		for(let i = 0; i < n_increments; i++){

			data.push({
				y: Math.round(options[row_offset + i][yvar] * 1000000) / 1000000,
				x: factors[xvar] * Math.round(options[row_offset + i][xvar] * 1000000) / 1000000
			})

		}

		sensitivityChart.data.datasets.push({
			label: `ID: ${oid}`,
			data: data,
			borderColor: colors[idx],
			backgroundColor: 'rgba(52, 58, 64, 0.15)',
			fill: false
		});

		sensitivityChart.options.scales.xAxes[0].scaleLabel.labelString = names[xvar];
		sensitivityChart.options.scales.yAxes[0].scaleLabel.labelString = names[yvar];

		let xmin = data[0].x;
		let xmax = data[data.length - 1].x;

		sensitivityChart.options.scales.xAxes[0].ticks['max'] = xmax * 1.03;
		sensitivityChart.options.scales.xAxes[0].ticks['stepSize'] = (xmax - xmin) / 6;

	})

	sensitivityChart.update();

}