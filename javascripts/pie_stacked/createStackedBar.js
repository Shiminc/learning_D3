import {xScale, chart, margin } from './variable.js'


export function createStackedBar (data){
    console.table(data)
        const svg = d3.select('#stacked_chart')
        .append('svg')
            .attr('id','svg-stacked')
            .attr('viewBox',`0 0 ${chart.width} ${chart.height}`)
            .style('background-color','pink')

}