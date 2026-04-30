let dataset

//Main
d3.json('../data/trend.json').then(
  data => {
    dataset = data
  // put any function here
   console.log(data)
   createViz(data)
  })
.catch(error => console.log(error));

// helper functions
const parseDate = d3.timeParse("%Y-%m-%d")

// chart setting
const chart = {
  'height' : 500,
  'width' : 800
}

const margin = {
  'left': 50, 
  'right': 25,
  'top': 50,
  'bottom': 50
}

//
function createViz(data){
  //fields to be visualised, only use for scaling function
  const dateArray = data.map(d=>parseDate(d.year_month)) 
  const countArray = data.map(d=>d.Incident)
  console.log(dateArray)
  //scale
  const xScale = d3.scaleTime()
                  .domain([d3.min(dateArray), parseDate('2026-01-01')])
                  .range([0, chart.width - margin.right - margin.left])

  const yScale = d3.scaleLinear()
                  .domain([0,d3.max(countArray)+1])
                  .range([chart.height-margin.bottom - margin.top, 0])

  console.table(data)
  //start drawing
  const svg = d3.select('#trend_chart')
                  .append('svg')
                      .attr('viewBox',`0 0 ${chart.width} ${chart.height}`)
                      .style('border','1px solid black');
  
  const base = svg
      .append('g')
      //decide position y for each bar & label TODO test using x, y
        .attr('class','trend_base')
        .attr('transform', d=> `translate(${margin.left}, ${margin.top})`)
  
  //draw point
  const data_base = base
    .selectAll('g')
      .data(data)
      .join('g')

  // const label = data_base
  //       .append('text')
  //       // .attr('r', 2)
  //       // .attr('class','point')
  //       .attr('x', d=>xScale(parseDate(d.year_month)))
  //       .attr('y', d=>yScale((d.Incident)))
  //       .text(d=>d.year)
  // above good for checking the orientation of axis/scale is correct

  const point = data_base
        .append('circle')
        .attr('cx', d=>xScale(parseDate(d.year_month)))
        .attr('cy', d=>yScale((d.Incident)))
        .attr('r', 2)
        .attr('fill','red')
        
  
        

  // draw axis
  const xAxis = d3.axisBottom()
                .scale(xScale)
                .tickFormat(d3.timeFormat("%Y"))
                // .tickValues([parseDate('2015-01-01'),
                //   parseDate('2015-06-01'),parseDate('2016-01-01')
                // ])

    
  const bottomAxis = base.append('g')
                    .attr("class", "axis-x")
                    .call(xAxis)
                    .attr('transform',`translate(0, ${chart.height-margin.bottom-margin.top})`)
                    .attr('text-anchor','end')
  
  d3.selectAll(".axis-x text")
        // .attr('fill','red')
        .attr('transform',`translate(-10, 0)`)


  const yAxis = d3.axisLeft()
                .scale(yScale);

    
  const leftAxis = base.append('g')
                    .attr("class", "axis-y")
                    .call(yAxis)
                    // .attr('transform',`translate(0, 0)`)
  const yLabel = base.append('text')
                    .text('Number of Incident')
                    .attr('font-size', '10px')
                    .attr('transform',`translate(-20, -10)`)
//draw line
  const lineGenerator = d3.line()
    .x(d=>xScale(parseDate(d.year_month)))
    .y(d=>yScale((d.Incident)))

  base.append('path')
    .attr('d', lineGenerator(data))
    .attr('fill','none')
    .attr('stroke','black')
  }

