
var drawBarChart = function() {
  const svg = d3.select("#bar")
  .append("svg")
  .attr('viewBox',"0 0 1200 1600")
  .style('border','1 px solid black');
};

function drawSVG (){
  d3.select("#original")
  .append('rect')
}
// first way

// declare data as global variable in case we need to use it later, else it is perfectly ine just use the below but add const

let data
async function main() {
  try {
    data = await d3.json("../data/weather.json");
    console.log(data);
    drawBarChart()

  } catch(e) {
    console.log(e);
  }
};

main(); 

// drawBarChart()
// drawSVG ()


//second way
d3.json("../data/weather.json")
.then(data => {
  // put any function here
   drawBarChart();
   console.log(data)
  })
.catch(error => console.log(error));