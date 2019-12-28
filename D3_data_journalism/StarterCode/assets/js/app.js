	// @TODO: YOUR CODE HERE!
	let svgWidth = 960;
	let svgHeight = 500;

	let margin = {
	  top: 40,
	  right: 100,
	  bottom: 100,
	  left: 100
	};

	let width = svgWidth - margin.left - margin.right;
	let height = svgHeight - margin.top - margin.bottom;

	// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
	let svg = d3
	  .select("#scatter")
	  .append("svg")
	  .attr("height", svgHeight)
	  .attr("width", svgWidth);

	// Define the size of the circles in the graph
	   var radius
	   function getradius() {
	   	radius = 10
	   }
	getradius()

	// Append group element
	var chartGroup = svg.append("g")
	  .attr("transform", `translate(${margin.left}, ${margin.top})`);

	// Initial Params
	var chosenXAxis = "poverty";  
	var chosenYAxis = "healthcare";

	// function used for updating x-scale var upon click on axis label
	function xScale(UScensus, chosenXAxis) {
	  // create scales
	  var xLinearScale = d3.scaleLinear()
	    .domain([d3.min(UScensus, d => d[chosenXAxis]) * 0.8,
	      d3.max(UScensus, d => d[chosenXAxis]) * 1.2
	    ])
	    .range([0, width]);

	  return xLinearScale;
	}

	// function used for updating y-scale var upon click on axis label
	function yScale(UScensus, chosenYAxis) {
	  // create scales
	  var yLinearScale = d3.scaleLinear()
	    .domain([d3.min(UScensus, d => d[chosenYAxis]),
	      d3.max(UScensus, d => d[chosenYAxis])
	    ])
	    .range([height, 0]);

	  return yLinearScale;
	}

	// function used for updating xAxis var upon click on axis label
	function renderXAxes(newXScale, xAxis) {
	  var BottomAxis = d3.axisBottom(newXScale);

	  xAxis.transition()
	  .duration(1000)  
	  .call(BottomAxis);

	  return xAxis;
	}

	// function used for updating yAxis var upon click on axis label
	function renderYAxes(newYScale, yAxis) {
	var LeftAxis = d3.axisLeft(newYScale);

	   yAxis.transition()
	    .duration(1000) 
	    .call(LeftAxis);

	   return yAxis;
	 }

	// function for updating circles group with a transition to
	// new circles
	function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

	  circlesGroup.transition()
	    .duration(1000) 
	    .attr("cx", d => newXScale(d[chosenXAxis]))
	    .attr("cy", d => newYScale(d[chosenYAxis]));

	  return circlesGroup;
	}

	function renderText(textGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

	  textGroup.transition()
	    .duration(1000) 
	    .attr("x", d => newXScale(d[chosenXAxis]))
	    .attr("y", d => newYScale(d[chosenYAxis]));

	  return textGroup;
	}

	//Axis function used for updating circles group with new tooltip
	function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {

	  if (chosenXAxis === "poverty") {
	    var labelx= "Poverty:";
	    var suffixX = "%";
	  } else if (chosenXAxis ==="age") {
	    var labelx= "Age (Median):";
	    var suffixX = "";
	  } else {
	    var labelx= "Household Income (Median):";
	    var suffixX = "";
	  }

	  if (chosenYAxis === "healthcare") {
	     var labely = "Healtchare:";
	     var suffixY = "%";
	   } else if (chosenYAxis ==="smokes") {
	     var labely = "Smokes:";
	     var suffixY = "%";
	   } else {
	     var labely = "Obesity:";
	     var suffixY = "%";
	   }

	   // Initializing the toolTip
	  var toolTip = d3.tip()
	    .attr("class", "d3-tip")
	    .offset([80, -60])
	    .html(function(d) {
	      return (`${d.state}<br>${xlabel} ${d[chosenXAxis].toLocaleString()}${suffixX}<br>${labely} ${d[chosenYAxis]}${suffixY}`);
	    });


	  // Creating a toolTip in the chart
	   
	  circlesGroup.call(toolTip);
	  textGroup.call(toolTip);
	  

	  // Creating event listeners to display and hide the tooltip

	  circlesGroup.on("mouseover", function(data) {
	    toolTip.show(data);
	  })
	    // onmouseout event
	    .on("mouseout", function(data, index) {
	      toolTip.hide(data);
	    });

	  textGroup.on("mouseover", function(data) {
	     toolTip.show(data);
	    })
	     // onmouseout event
	     .on("mouseout", function(data, index) {
	       toolTip.hide(data);
	     });
	    

	  return circlesGroup;  
	  return textGroup;
	}

	 
	// Retrieve data from the CSV file and execute everything below
	d3.csv("assets/data/data.csv").then(function(UScensus, err) {
	  if (err) throw err;

	  // parse data by formatting it
	  UScensus.forEach(function(d) {
	   d.healthcare = +d.healthcare;
	   d.poverty = +d.poverty;
	   d.smokes = +d.smokes;
	   d.age = +d.age;
	   d.income = +d.income;
	   d.obesity = +d.obesity; 
	  });

	// xLinearScale function above csv import
	var xLinearScale = xScale(UScensus, chosenXAxis);

	// Create yLinearscale function
	var yLinearScale = yScale(UScensus, chosenYAxis)

	// Create initial axis functions
	var BottomAxis = d3.axisBottom(xLinearScale);
	var LeftAxis = d3.axisLeft(yLinearScale);


	// append x axis
	var xAxis = chartGroup.append("g")
	  .attr("transform", `translate(0, ${height})`)
	  .call(BottomAxis);


	// append y axis
	var yAxis = chartGroup.append("g")
	  .call(LeftAxis);

	// append initial circles
	var circlesGroup = chartGroup.selectAll("circle")
	  .data(UScensus)
	  .enter()
	  .append("circle")
	  .attr("cx", d => xLinearScale(d[chosenXAxis]))
	  .attr("cy", d => yLinearScale(d[chosenYAxis]))
	  .attr("r", 10)
	  .attr("fill", "#99badd" )
	  .attr("opacity", ".9");

	let textGroup = chartGroup.selectAll()
	  .data(UScensus)
	  .enter()
	  .append("text")
	  .attr("text-anchor", "middle")

	  // .attr("dx", function(d){return -10})
	  .attr("dy", function(d){return +5})
	  .text(d => d.abbr)
	  .attr("x", d => xLinearScale(d[chosenXAxis]))
	  .attr("y", d => yLinearScale(d[chosenYAxis]))
	  .attr("font-size", "15px")
	  .attr("font-weight", "bold")
	  .attr("fill", "white");

	// Create group for 3 x- axis labels
	var labelsGroupX = chartGroup.append("g")
	.attr("transform", `translate(${width / 2}, ${height + 20})`);

	// Create X axes labels
	var povertlabely = labelsGroupX.append("text")
	  .attr("x", 0)
	  .attr("y", 20)
	  .attr("valuex", "poverty") // value to grab for event listener
	  .classed("active", true)
	  .text("In Poverty (%)");

	var ageLabel = labelsGroupX.append("text")
	  .attr("x", 0)
	  .attr("y", 45)
	  .attr("valuex", "age") // value to grab for event listener
	  .classed("inactive", true)
	  .text("Age (Median)");

	var houseIncomeLabel = labelsGroupX.append("text")
	  .attr("x", 0)
	  .attr("y", 70)
	  .attr("valuex", "income") // value to grab for event listener
	  .classed("inactive", true)
	  .text("Household Income (Median)");


	// Create group for 3 y- axis labels
	var labelsGroupY = chartGroup.append("g")
	  .attr("transform", "rotate(-90)");

	// Create Y axes Labels
	var healthcareLabel = labelsGroupY.append("text")
	  .attr("y", 0 - margin.left + 50)
	  .attr("x", 0 - (height / 2))
	  .attr("valuey", "healthcare") // value to grab for event listener
	  .attr("dy", "1em")
	  .classed("active", true)
	  .text("Lacks Healthcare (%)");

	var smokesLabel = labelsGroupY.append("text")
	  .attr("y", 0 - margin.left + 25)
	  .attr("x", 0 - (height / 2))
	  .attr("valuey", "smokes") // value to grab for event listener
	  .attr("dy", "1em")
	  .classed("inactive", true)
	  .text("Smokes (%)");

	var obesitlabely = labelsGroupY.append("text")
	  .attr("y", 0 - margin.left)
	  .attr("x", 0 - (height / 2))
	  .attr("valuey", "obesity") // value to grab for event listener
	  .attr("dy", "1em")
	  .classed("inactive", true)
	  .text("Obese (%)");

	// updateToolTip function above csv import
	var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

	// X axis labels event listener
	labelsGroupX.selectAll("text")
	.on("click", function() {
	  // get value of selection
	  var valuex = d3.select(this).attr("valuex");
	  if (valuex !== chosenXAxis) {

	    // replaces chosenXAxis with value
	      chosenXAxis = valuex;

	    // functions here found above csv import
	    // updates x scale for new data
	     xLinearScale = xScale(UScensus, chosenXAxis);

	    // updates x axis with transition
	     xAxis = renderXAxes(xLinearScale, xAxis);

	    // updates circles with new x values
	     circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
	     textGroup = renderText(textGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

	    // updates tooltips with new info
	     circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

	    // XAxis Lables: changes classes to change bold text 
	     if (chosenXAxis === "age") {
	        povertlabely
	          .classed("active", false)
	          .classed("inactive", true);
	        ageLabel
	         .classed("active", true)
	         .classed("inactive", false);
	        houseIncomeLabel
	          .classed("active", false)
	          .classed("inactive", true);
	        
	     } else if (chosenXAxis === "income") {
	        povertlabely
	          .classed("active", false)
	          .classed("inactive", true);  
	        ageLabel
	          .classed("active", false)
	          .classed("inactive", true);
	        houseIncomeLabel
	          .classed("active", true)
	          .classed("inactive", false);
	     } else {
	        povertlabely
	         .classed("active", true)
	         .classed("inactive", false);
	        ageLabel
	          .classed("active", false)
	          .classed("inactive", true);
	        houseIncomeLabel
	          .classed("active", false)
	          .classed("inactive", true);
	     }
	    }
	  });

	// Y axis labels event listener
	labelsGroupY.selectAll("text")
	.on("click", function() {
	  // get value of selection
	  var valuey = d3.select(this).attr("valuey");
	  if (valuey !== chosenYAxis) {

	    // replaces chosenYAxis with value
	      chosenYAxis = valuey;

	    // console.log(chosenXAxis)

	    // functions here found above csv import
	    // updates y scale for new data
	     yLinearScale = yScale(UScensus, chosenYAxis);

	    // updates Y axis with transition
	     yAxis = renderYAxes(yLinearScale, yAxis);

	    // updates circles with new x values
	     circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
	     textGroup = renderText(textGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
	 
	    // updates tooltips with new info
	     circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
	   
	     // YAxis Lables: changes classes to change bold text  
	     if (chosenYAxis === "smokes") {
	        healthcareLabel
	          .classed("active", false)
	          .classed("inactive", true);
	        smokesLabel
	         .classed("active", true)
	         .classed("inactive", false);
	        obesitlabely
	          .classed("active", false)
	          .classed("inactive", true);
	        
	     } else if (chosenYAxis === "obesity") {
	        healthcareLabel
	          .classed("active", false)
	          .classed("inactive", true);  
	        smokesLabel
	          .classed("active", false)
	          .classed("inactive", true);
	        obesitlabely
	          .classed("active", true)
	          .classed("inactive", false);
	     } else {
	        healthcareLabel
	         .classed("active", true)
	         .classed("inactive", false);
	        smokesLabel
	          .classed("active", false)
	          .classed("inactive", true);
	        obesitlabely
	          .classed("active", false)
	          .classed("inactive", true);
	     }
	    }
	  });


	 }).catch(function(error) {
	   console.log(error);
	});
