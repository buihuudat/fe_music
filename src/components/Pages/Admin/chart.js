import React from 'react';
import CanvasJSReact from './canvasjs-3.5/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ChartAdmin extends React.Component {
  constructor() {
	  super();
	  this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
	
  toggleDataSeries(e){
	  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const options = {
			theme: "dark2",
			animationEnabled: true,
			title:{
				text: "Viewer vs Premium"
			},
			subtitles: [{
				text: "Total number of people who signed up for a premium account"
			}],
			axisX: {
				title: "States"
			},
			axisY: {
				title: "Units Sold",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "Profit in USD",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "Viewer",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0 Units",
				dataPoints: [
					{ x: new Date(2022, 0, 1), y: 120 },
					{ x: new Date(2022, 1, 1), y: 135 },
					{ x: new Date(2022, 2, 1), y: 144 },
					{ x: new Date(2022, 3, 1), y: 103 },
					{ x: new Date(2022, 4, 1), y: 93 },
					{ x: new Date(2022, 5, 1), y: 129 },
					{ x: new Date(2022, 6, 1), y: 143 },
					{ x: new Date(2022, 7, 1), y: 156 },
					{ x: new Date(2022, 8, 1), y: 122 },
					{ x: new Date(2022, 9, 1), y: 106 },
					{ x: new Date(2022, 10, 1), y: 137 },
					{ x: new Date(2022, 11, 1), y: 142 }
				]
			},
			{
				type: "spline",
				name: "Premium",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
					{ x: new Date(2022, 0, 1), y: 19034.5 },
					{ x: new Date(2022, 1, 1), y: 20015 },
					{ x: new Date(2022, 2, 1), y: 27342 },
					{ x: new Date(2022, 3, 1), y: 20088 },
					{ x: new Date(2022, 4, 1), y: 20234 },
					{ x: new Date(2022, 5, 1), y: 29034 },
					{ x: new Date(2022, 6, 1), y: 30487 },
					{ x: new Date(2022, 7, 1), y: 32523 },
					{ x: new Date(2022, 8, 1), y: 20234 },
					{ x: new Date(2022, 9, 1), y: 27234 },
					{ x: new Date(2022, 10, 1), y: 33548 },
					{ x: new Date(2022, 11, 1), y: 32534 }
				]
			}]
		}
		
		
		return (
      <div>
        <CanvasJSChart options = {options} 
          onRef={ref => this.chart = ref}
        />
		  </div>
		);
	}
			
}
 
export default ChartAdmin;           