import {xScale, colorScale, chart, whole_chart, margin, incident_cause } from './variable.js'


const parseMonth = d3.timeParse("%m")


const stackGenerator = d3.stack()
    .keys(incident_cause)
    // .order(d3.stackOrderDescending)
    // make it into 100% bar
    // .offset(d3.stackOffsetExpand);




export function createStackedBar (data){
    console.log('original_data')
    console.table(data)
    console.log(data)

    const annotatedData = stackGenerator(data)
    console.log(annotatedData)

    //last series to get the max height
    console.log(annotatedData[annotatedData.length - 1])
    const maxUpperBoundary = d3.max(annotatedData[annotatedData.length - 1], d=>d[1])

    const yScale = d3.scaleLinear()
            .domain([0,maxUpperBoundary])
            .range([chart.height,0])
            .nice();

    const svg = d3.select('#stacked_chart')
        .append('svg')
            .attr('id','svg-stacked')
            .attr('viewBox',`0 0 ${whole_chart.width} ${whole_chart.height}`)
            .style('background-color','pink')
    
    const innerChart = svg.append("g")
      .attr("transform", `translate(${margin.horizontal}, ${margin.vertical})`);


    annotatedData.forEach(series => {

        innerChart
            .selectAll(`bar-${series.key}`)
            .data(series)
            .join('rect')
                .attr('class',`bar-${series.key}`)
                .attr('x',d=>{

                    console.log('real month',d.data.month)
                    return xScale(d.data.month)
                
                })
                .attr('y',d=>yScale(d[1]))
                .attr('width', xScale.bandwidth())
                .attr('height', d => yScale(d[0])-yScale(d[1]))
                .attr('fill',colorScale(series.key))
                


    });
    console.log('dec',xScale(12))
    
// d3.axisBottom(xScale).tickFormat(d => {
//     return "ID: " + d;
// });

    const bottomAxis = d3.axisBottom(xScale)
        // .tickValues(d3.range(0,12,1))
        .tickSize(1)
        // .tickFormat(d3.timeFormat('%b'))
        .tickSizeOuter(0)
             
    console.log(bottomAxis)

    const leftAxis = d3.axisLeft(yScale)
        .tickSize(1)
        .tickSizeOuter(0)

    console.log(leftAxis)

    innerChart.append('g')
        .attr('transform',`translate(0,${chart.height})`)
        .call(bottomAxis)
        .attr('font-size', '2px')
        .attr('class','x-axis-bar')
        .style("stroke-width", "0.2px")

    innerChart.append('g')
       .call(leftAxis)
        .attr('font-size', '2px')
        .attr('class','y-axis-bar')
        .attr('text-anchor','end')
        .style("stroke-width", "0.2px")

    // edit the axis tick value into month by first changing it to time so the time format could be applied
    d3.selectAll(".x-axis-bar text")
    .text((e) => {
            return d3.timeFormat("%b")(parseMonth(e)) 



    });

    // label for y using tspan

    const leftAxisLabel = svg
        .append('text')
        .attr('class','leftAxisLabel-bar')
        .attr('dominant-baseline','hanging')

    leftAxisLabel
        .append('tspan')
            .text('Total number of')
                .attr('font-size', '2px')

    
    leftAxisLabel
        .append('tspan')
        .text('Incidents')
        .attr('x','2')
        .attr('dy',2)
        .style('font-size', '2px')

    // svg.append('line')
    //     .attr('x1',xScale(6)-xScale.bandwidth()/2)
    //     .attr('x2',xScale(6)-xScale.bandwidth()/2)
    //     .attr('y1',chart.height)
    //     .attr('y2',-chart.height)
    //     .attr('stroke','black')

}