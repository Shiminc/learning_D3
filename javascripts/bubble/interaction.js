const tooltipWidth = 45;
const tooltipHeight = 20;
import {svg_width, svg_height, chart, margin, innerChart} from '../declareVariable.js';


function showTooltips(e,d) {
    console.log(d.Incident)
    console.log(e)

    const cx = e.target.getAttribute('cx')
    const cy = e.target.getAttribute('cy')
    d3.select('.tooltipContainer')
    .attr('transform',`translate (${cx},${cy-tooltipHeight})`)
    .transition()
        .duration(200)
        .style('opacity',1);
    d3.select('.tooltipText').text(d.Incident)
}

function hideTooltips(e,d) {


    d3.select('.tooltipContainer')
    .attr('transform',`translate (1000,1000)`)

    .transition()
        .duration(200)
        .style('opacity',0);
}


export function createTooltipsContainer (){
    const tooltipContainer = d3.select('.chart_area')
    .append('g')
    .attr('class','tooltipContainer')
    .style('opacity',0);

    tooltipContainer.append('rect')
        .attr('x', 1000)
        .attr('y',1000)
        .attr('rx',3)
        .attr('ry',3)
        .attr('class','tooltipBackground')
        .attr('fill','white')
        .attr('height',tooltipHeight)
        .attr('width',tooltipWidth)

    tooltipContainer.append('text')
        .attr('class','tooltipText')
        .text('trial')
        .attr('x',tooltipWidth/2)
        .attr('y',tooltipHeight/2+5)
        .attr('text-anchor','middle')
        .attr('alignment-baseline','middle')
        .attr('fill','black')
        .attr('font-size',10)
}
export function createTooltips () {
    const bubbleTooltips = d3.select('#bubble_chart')
    .selectAll('circle')
    .on('mouseenter',showTooltips)
    .on('mouseleave',hideTooltips)

}