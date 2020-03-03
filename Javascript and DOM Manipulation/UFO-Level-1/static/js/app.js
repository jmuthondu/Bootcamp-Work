// Assign the data from data.js to descriptive variable
var ufoData = data;

// get table references from the html page
var tbody = d3.select("tbody");

// create a table with all data in it and clear out any existing data
function ufotable(ufoData) {
  tbody.html("");

  // Loop through all the data and add them to the table appending rows and cells for each value
ufoData.forEach((uforow) => {
var tablerow = tbody.append("tr");

// Adding a row in the tbody for every record in the datafile
Object.values(uforow).forEach((item) => {
  var datacell = tablerow.append("td");
    datacell.text(item);
  }
);
});
}

function handleClick() {
  // using d3 to prevent a refresh 
  d3.event.preventDefault();
  // Grab the datetime value from the filter
  var inputdate = d3.select("#datetime").property("value");

  let datafiltered = ufoData;
  // Filter the date using the if...
  if (inputdate) {
    datafiltered = datafiltered.filter(row => row.datetime === inputdate);
  }
// filtered table depending on the date selected
  ufotable(datafiltered);
}
// Use the on-button to trigger an event upon any clicking 
d3.selectAll("#filter-btn").on("click", handleClick);
 
ufotable(ufoData);

