import {svg_width, svg_height, chart, padding_between_bar} from './declareVariable.js';



export function drawWithGroup(data) {
  // declare datafield
  const count_array = data.map(d=>d.count)
  const weather_array = data.map(d=>d.Weather)

  const xScale = d3.scaleLinear()
          .domain([0,d3.max(count_array)])
          .range([0,chart.width - chart.left_padding - chart.right_padding]);
    
  const yScale = d3.scaleBand()
          .domain(weather_array)
          .range([0,chart.height])
          .paddingInner(padding_between_bar);

      // create the chart area
  const svg = d3.select('#bar_chart')
                .append('svg')
                // viewBox is used to main aspect ratio, first 2 numbers are coordinate, the last two are width and height
                .attr('viewBox',`0 0 ${chart.width} ${chart.height}`)
                .style('border','1px solid black'); 


  //bar and label grouped together
  const base = svg
      .selectAll('g')
      .data(data)
      .join('g')
      //decide position y for each bar & label TODO test using x, y
        .attr('transform', d=> `translate(0, ${yScale(d.Weather)})`)

  //add the bar
  const bar = base
    .append('rect')
      .attr('class', 'bar')
      .attr('width', d => xScale(d.count))
      .attr('height', yScale.bandwidth())
      //x, y now is relative to the parent/g
      .attr('x',chart.left_padding)
      .attr('y', 0)
      .attr('fill', d => d.Weather === 'Rain' ? 'yellowgreen' : 'skyblue');

  const label = base
    .append('text')
                    .attr('class','ylabel')
                    .text(d=>d.Weather)
                    .attr('x',chart.left_padding - 2)
                    // to center the text at the center of y of the bar
                    .attr('y', yScale.bandwidth()*0.8/2 + (yScale.bandwidth()-5)/2 )
                    .attr('fill','black')
                    .attr('font-family','sans-serif')
                    .attr('font-size',`${yScale.bandwidth()-5}px`)
                    .attr('text-anchor','end');

  const annotation = base
    .append('text')
    .attr('class','annotation')
                        .text(d=>d.count)
                    .attr('x',d => xScale(d.count) + chart.left_padding + 2)
                    // to center the text at the center of y of the bar
                    .attr('y', yScale.bandwidth()*0.8/2 + (yScale.bandwidth()-5)/2)
                    .attr('fill','black')
                    .attr('font-family','sans-serif')
                    .attr('font-size',`${yScale.bandwidth()-5}px`)
                    .attr('text-anchor','start');
}


