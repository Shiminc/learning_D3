import {svg_width, svg_height, chart, margin, innerChart} from './declareVariable.js';

console.log(innerChart)

// declare time parser with format using d3.function
const parseDate = d3.timeParse("%d/%m/%Y")
const parseMonthDate = d3.timeParse("%d/%m")
const parseYearMonth = d3.timeParse("%m/%Y")
const parseYear = d3.timeParse("%Y")



export function dateConverter (data) {
    for (let i = 0; i < data.length; i++){
        data[i].date = parseDate(data[i].day + '/' + data[i].month + '/' + data[i].year)
        data[i].month_day = parseMonthDate(data[i].day + '/' + data[i].month)
        data[i].year_month = parseYearMonth(data[i].month + '/' + data[i].year)

    }
    return data;
} 

export function drawBubble (data) {
    const hrs_array = data.map(d=>d.total_hrs)
    const month_day_array = data.map(d=>d.month_day)
    const year_month_array = data.map(d=>d.year_month)
    const year_array = data.map(d=>d.year)

    console.log(d3.min(month_day_array))
    console.log(d3.max(month_day_array))

    const xScale = d3.scaleTime()
                .domain([parseMonthDate('01/01'),parseMonthDate('31/12')])
                .range([0, innerChart.width]);

    // to make 2025 at the top, and include 2014 to have space between axis and 2015
    const yScale = d3.scaleLinear()
                .domain([2025,2015])
                .range([0,innerChart.height])

    

    console.log(parseMonthDate('01/01'))
    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .tickFormat(d3.timeFormat("%b"));

    const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickFormat(d3.format("d"));


    console.log(yAxis)

    const svg = d3.select('#bubble_chart')
                .append('svg')
                    .attr('viewBox',`0 0 ${chart.width} ${chart.height}`)
                    .style('border','1px solid black');

    const base = svg
        .append('g')
        .attr('transform',`translate(${margin.left}, ${margin.top})`)

    const bubble = base
                .selectAll('circle')
                .data(data)
                .join('circle')
                    .attr('class','bubbles')
                    .attr("cx", d => xScale(d.month_day) )          
                    .attr("cy", d => yScale(d.year) )
                    .attr("r",  d => Math.sqrt(d.total_hrs))
                    .attr('opacity', 0.3)
          

    const bottomAxis = base.append('g')
    				.attr("class", "axis-x")
                    .call(xAxis)
                    .attr('transform',`translate(0, ${innerChart.height})`)

    const leftAxis = base.append('g')
    				.attr("class", "axis-y")
                    .call(yAxis)

    function labelCentre (d){
        const currentMonthDate = parseMonthDate(`${d.getDate()}/${d.getMonth()+1}`)
        const nextMonthDate = parseMonthDate(`${d.getDate()}/${d.getMonth()+2}`)
        return ((xScale(nextMonthDate) - xScale(currentMonthDate))/2)
    } 
 
    //style x-axis label, centre the label
    d3.selectAll(".axis-x text")
        .attr('y','10px')
        .attr('x', d => labelCentre(d))


        



}