

function drawBarChart (data) {
    const count_array = data.map(d=>d.count)
    const weather_array = data.map(d=>d.Weather)
    const chart_width = 600
    const chart_height = 1000
    const bar_height = 20

    const xScale = d3.scaleLinear()
            .domain([0,d3.max(count_array)])
            .range([0,chart_width]);
    
    const yScale = d3.scaleBand()
            .domain(weather_array)
            .range([0,chart_height])
            .paddingInner(0.2);

    console.log(xScale(100))
    console.log(yScale.bandwidth())

    // is it better to have svg itself in html
    const svg = d3.select('#bar_chart')
                .append('svg')
                // viewBox is used to main aspect ratio, first 2 numbers are coordinate, the last two are width and height
                .attr('viewBox',`0 0 ${chart_width} ${chart_height}`)
                .style('border','1px solid black'); 



    svg
        .selectAll('rect')
        .data(data)
        .join('rect')
            .attr('class', 'bar')
            .attr('width', d => xScale(d.count))
            .attr('height', bar_height)
            .attr('x',100)
            .attr('y', d => yScale(d.Weather))
            .attr('fill', d => d.Weather === 'Rain' ? 'yellowgreen' : 'skyblue')
}



let data
async function main() {
  try {
    data = await d3.json("../data/weather.json");
    console.log(data);
    drawBarChart(data)

  } catch(e) {
    console.log(e);
  }
};

main(); 
