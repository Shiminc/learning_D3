
export function drawBarLabelSeparately (data) {
    const count_array = data.map(d=>d.count)
    const weather_array = data.map(d=>d.Weather)
    const svg_width = 600
    const svg_height = 400
    const chart_width = 500
    const chart_height = 400
    const chart_left_margin = 75
    const chart_right_margin = 25
    const padding_between_bar = 0.2


    const xScale = d3.scaleLinear()
            .domain([0,d3.max(count_array)])
            .range([0,chart_width - chart_right_margin]);
    
    const yScale = d3.scaleBand()
            .domain(weather_array)
            .range([0,chart_height])
            .paddingInner(padding_between_bar);

    const ylabel = yScale.bandwidth
            console.log(xScale(100))
  
    // is it better to have svg itself in html
    // create the chart area
    const svg = d3.select('#bar_chart')
                .append('svg')
                // viewBox is used to main aspect ratio, first 2 numbers are coordinate, the last two are width and height
                .attr('viewBox',`0 0 ${svg_width} ${svg_height}`)
                .style('border','1px solid black'); 


    // create the bar
    const bar = svg
              .selectAll('rect')
              .data(data)
              .join('rect')
                  .attr('class', 'bar')
                  .attr('width', d => xScale(d.count))
                  .attr('height', yScale.bandwidth())
                  .attr('x',chart_left_margin)
                  .attr('y', d => yScale(d.Weather))
                  .attr('fill', d => d.Weather === 'Rain' ? 'yellowgreen' : 'skyblue');


    const label = svg
                  .selectAll('text')
                  .data(data)
                  .join('text')
                    .attr('class','ylabel')
                    .text(d=>d.Weather)
                    .attr('x',chart_left_margin-2)
                    // to center the text at the center of y of the bar
                    .attr('y', d => yScale(d.Weather) + yScale.bandwidth()*(1+padding_between_bar) -  (yScale.bandwidth()-5))
                    .attr('fill','black')
                    .attr('font-family','sans-serif')
                    .attr('font-size',`${yScale.bandwidth()-5}px`)
                    .attr('text-anchor','end');




}