import {svg_width, svg_height, chart} from './declareVariable.js';

// declare time parser with format using d3.function
const parseDate = d3.timeParse("%d/%m/%Y")
const parseMonthDate = d3.timeParse("%d/%m")
const parseYearMonth = d3.timeParse("%m/%Y")


export function dateConverter (data) {
    for (let i = 0; i < data.length; i++){
        data[i].date = parseDate(data[i].day + '/' + data[i].month + '/' + data[i].year)
        data[i].month_day = parseMonthDate(data[i].day + '/' + data[i].month)
        data[i].year_month = parseYearMonth(data[i].month + '/' + data[i].year)

    }
    return data;
} 

export function drawBubble (data) {
    const hrs_array = data.map(d=>d.hrs)
    const month_day_array = data.map(d=>d.month_day)
    const year_month_array = data.map(d=>d.year_month)
    const year_array = data.map(d=>d.year)

    console.log(d3.min(month_day_array))
    console.log(d3.max(month_day_array))

    const xScale = d3.scaleTime()
                .domain([parseMonthDate('01/01'),parseMonthDate('31/12')])
                .range([chart.left_padding, chart.width - chart.left_padding - chart.right_padding]);

    const yScale = d3.scaleTime()
                .domain([2025,2015])
                .range([chart.top_padding,chart.height-chart.bottom_padding])



    const svg = d3.select('#bubble_chart')
                .append('svg')
                    .attr('viewBox',`0 0 ${chart.width} ${chart.height}`)
                    .style('border','1px solid black');

    const base = svg
                .selectAll('circle')
                .data(data)
                .join('circle')
                    .attr('class','bubbles')
                    .attr("cx", d => xScale(d.month_day) )          
                    .attr("cy", d => yScale(d.year) )
                    .attr("r",  d => Math.sqrt(d.hrs))
                    .attr('opacity', 0.3)          



}