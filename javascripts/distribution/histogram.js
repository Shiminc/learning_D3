import {innerChart, chartArea, margin, binGenerator} from './variable.js'



export function createHistogram(data){
    // console.log('original data')
    // console.table(data)

    const bins_data = binGenerator(data)
    console.log(bins_data[0])

    // the count for each bin
    const countData = bins_data.map(d=>d.length)
    console.log('count_data',countData)

    // get the min of the lower bin (x1),and the max (x2) of the upper bin
    const xScale = d3.scaleLinear()
        .domain([bins_data[0].x0,bins_data[bins_data.length-1].x1])
        .range([0,innerChart.width])

    //nice make the axis later better number
    const yScale = d3.scaleLinear()
        .domain([d3.max(countData),0])
        .range([0,innerChart.height])
        .nice()


    const xAxis = d3.axisBottom(xScale)
        .tickSize(1)
        .tickSizeOuter(0)

        // .tickFormat(d=> d === 0 ? "": d)

    const yAxis = d3.axisLeft(yScale)
        .tickSize(1)
        .tickSizeOuter(0)

        // .tickFormat(d=> d === 0 ? "": d)
    // start drawing

    const svg = d3.select('#histogram')
        .append('svg')
        .attr('id','histogram')
        .attr('viewBox',`0 0 ${chartArea.width} ${chartArea.height}`)
        .style('background-color','pink');
 
    const base = svg
        // .selectAll('g')
        // .data(bins_data)
        // .join('g')
        .append('g')
        .attr('class','histogram')
        .attr('transform',`translate(${margin.horizontal}, ${margin.vertical})`);

    // const bar = base.append('rect')
    const bar = base.selectAll('rect')
        .data(bins_data)
        .join('rect')
        .attr('width', d=> xScale(d.x1)-xScale(d.x0))
        .attr('height',d=> yScale(0)-yScale(d.length))
        .attr('x',d=>xScale(d.x0))
        .attr('y',d=>yScale(d.length))
        .attr('fill','blue')
        .attr('stroke','white')
        .attr('stroke-width',0.1)

    //add axis
    svg.append('g')
        .attr('transform',`translate (${margin.horizontal},${innerChart.height+margin.vertical})`)
       .call(xAxis)
        .attr('font-size', '1.5px')
        .attr('class','x-axis-bar')
        .style("stroke-width", "0.2px")

        //the -0.25 to account for the strokewidth that caused misalignment
    svg.append('g')
        .attr('transform',`translate (${margin.horizontal - 0.25},${margin.vertical})`)
       .call(yAxis)
        .attr('font-size', '1.5px')
        .attr('class','y-axis-bar')
        .style("stroke-width", "0.2px")

    // svg.selectAll(".tick")
    // .filter(function (d) { return d == 0;  })
    // .remove();

    svg.append('text')
        .text('Frequency')
        .attr('font-size', '2px')
        .attr('dominant-baseline','hanging')
        .attr('y','3px')

    svg.append('text')
        .text('Number of hours')
        .attr('font-size', '2px')
        .attr('x',chartArea.width-margin.horizontal)
        .attr('y',chartArea.height-2)
        .attr('text-anchor','end')
 }