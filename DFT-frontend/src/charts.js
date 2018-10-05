function createChart(dataObj) {
  chartContDiv.dataset.id = dataObj.id
  let chartEmot = new CanvasJS.Chart("chart-emotion", {
  	theme: "dark1", // "light1", "light2", "dark1", "dark2"
  	exportEnabled: false,
  	animationEnabled: true,
    backgroundColor: "rgba(0,0,0,0)",
  	title: {
  		text: "Emotion Chart"
  	},
  	data: [{
  		type: "pie",
  		startAngle: 25,
  		toolTipContent: "<b>{label}</b>: {y}%",
  		showInLegend: "true",
  		legendText: "{label}",
  		indexLabelFontSize: 16,
  		indexLabel: "{label} - {y}%",
  		dataPoints: [
  			{ y: dataObj.emotion.happiness, label: "Happiness" },
  			{ y: dataObj.emotion.fear, label: "Fear" },
  			{ y: dataObj.emotion.surprise, label: "Surprise" },
  			{ y: dataObj.emotion.anger, label: "Anger" },
  			{ y: dataObj.emotion.disgust, label: "Disgust" },
  			{ y: dataObj.emotion.neutral, label: "Neutral" },
  			{ y: dataObj.emotion.sadness, label: "Sadness" }
  		]
  	}]
  });
chartEmot.render();

var chartSkin = new CanvasJS.Chart("chart-skinstatus", {
	animationEnabled: true,
	theme: "dark1", // "light1", "light2", "dark1", "dark2"
  backgroundColor: "rgba(0,0,0,0)",
	title:{
		text: "Skin Status"
	},
	axisY: {
		title: "Points"
	},
	data: [{
		type: "column",
		showInLegend: true,
		legendMarkerColor: "grey",
		legendText: "",
		dataPoints: [
			{ y: dataObj.skinstatus.dark_circle, label: "Dark Circle" },
			{ y: dataObj.skinstatus.stain,  label: "Stain" },
			{ y: dataObj.skinstatus.acne,  label: "Acne" },
			{ y: dataObj.skinstatus.health,  label: "Health" }
		]
	}]
});
chartSkin.render();


  let chartBFemale = new CanvasJS.Chart("chart-beauty-female", {
  	theme: "dark1", // "light1", "light2", "dark1", "dark2"
  	exportEnabled: false,
  	animationEnabled: true,
    backgroundColor: "rgba(0,0,0,0)",
  	title: {
  		text: "Female Beauty Chart"
  	},
  	data: [{
  		type: "pie",
  		startAngle: 25,
  		toolTipContent: "<b>{label}</b>: {y}%",
  		showInLegend: "true",
  		legendText: "{label}",
  		indexLabelFontSize: 16,
  		indexLabel: "{label} - {y}%",
  		dataPoints: [
  			{ y: dataObj.beauty.female_score, label: "Beauty Score" },
  			{ y: 100-dataObj.beauty.female_score, label: "" }
  			]
  	}]
  });
chartBFemale.render();



  let chartBMale = new CanvasJS.Chart("chart-beauty-male", {
  	theme: "dark1", // "light1", "light2", "dark1", "dark2"
  	exportEnabled: false,
  	animationEnabled: true,
    backgroundColor: "rgba(0,0,0,0)",
  	title: {
  		text: "Male Beauty Chart"
  	},
  	data: [{
  		type: "pie",
  		startAngle: 25,
  		toolTipContent: "<b>{label}</b>: {y}%",
  		showInLegend: "true",
  		legendText: "{label}",
  		indexLabelFontSize: 16,
  		indexLabel: "{label} - {y}%",
  		dataPoints: [
  			{ y: dataObj.beauty.male_score, label: "Beauty Score" },
  			{ y: 100-dataObj.beauty.male_score, label: "" }
  			]
  	}]
  });
  chartBMale.render();
}
