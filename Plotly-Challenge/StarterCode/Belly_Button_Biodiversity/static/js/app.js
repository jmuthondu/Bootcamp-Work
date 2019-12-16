 function buildMetadata(sample) {

//   // @TODO: Complete the following function that builds the metadata panel
 var url = '/metadata/${sample}';

//   // Use `d3.json` to fetch the metadata for a sample
d3.json(url).then(function(data) {

//    // Use d3 to select the panel with id of `#sample-metadata`
var sampledata = d3.select("#sample-metadata")

//     // Use `.html("") to clear any existing metadata
sampledata.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
Object.entries(data).forEach(([key,value])=>{
      sampledata.append("p").text(`${key} : ${value}`);
      }); 
  });
};   

function buildCharts(sample) {
   var url = `/samples/${sample}`;
//   // @TODO: Use `d3.json` to fetch the sample data for the plots
// 
d3.json(url).then(function(data){
        console.log(data);

//     // @TODO: Build a Bubble Chart using the sample data

		var otuids = data["otu_ids"];
		var sampleotuids = otuids.slice(0, 10);
		var values = data["sample_values"];
		var samplevalues = values.slice(0, 10);
		var outlabels = data["otu_labels"];

		var Data1 = {
			labels: otuids,
			values: samplevalues,
		    hovertext: outlabels,
		    type: "pie"
		};
		var data = [Data1];
		var layout = {
			title: "Belly Buuton Diversity Pie Chart"
		};

		var Data2 = {
			x: otuids,
			y: values,
			mode: "markers",
			marker: {
				color: ['rgb(0,0,200)','rgb(238,240,214)','rgb(238,247,189)','rgb(238,247,170)', 'rgb(208,254,167)', 'rgb(178,231,168)', 'rgb(134,231,168)',"rgb(77,231,168)","rgb(31,220,101)",'rgb(41,226,96)'],
				size: values,
		    },
		    text: outlabels,
		    type: "scatter"
		};

		var data1 = [Data2];
		var layout1 = {
			title: "Belly Button Diversity Bubble Chart ",
			width: 700,
			height: 700,
			showlegend: false,
		};

    // Building a Pie Chart
	    Plotly.newPlot("pie", data, layout);
	    Plotly.newPlot("bubble", data1, layout1);

});
}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();