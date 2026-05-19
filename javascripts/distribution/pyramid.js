import {innerChart, chartArea, margin} from './variable.js'

const binGenerator = d3.bin()
    .value(d=>d.Hours)

export function createPyramid(data){
    console.log('for pyramid')
    const bins_data = binGenerator(data)

    const lostData = data.filter(data=> (data.Cause==="Lost"))
    const injuredData =  data.filter(data=> (data.Cause==="Injured & Medical"))    
    
    const bins_lost = binGenerator(lostData)
    const bins_injured = binGenerator(injuredData)

    //find the one with the most bins to be used for scale
    let bins
    if (bins_lost.length > bins_injured.length) {
        bins = bins_lost 
    } else {
        bins = bins_injured
    }
    console.log(bins)

    const sum_lost = lostData.length
    console.log(sum_lost)
    const per_lost = bins_lost.map(d=>d.length/sum_lost)
    console.log(per_lost)
    const sum_injured = injuredData.length
    console.log(sum_injured)
    const per_injured = bins_injured.map(d=>d.length/sum_injured)
    console.log(per_injured)

    const per_max = d3.max(per_lost.concat(per_injured))
    console.log(per_max)

    // the count for each bin
    const countData = bins.map(d=>d.length)

    // get the min of the lower bin (x1),and the max (x2) of the upper bin
    const yScale = d3.scaleLinear()
        .domain([bins[0].x0,bins[bins.length-1].x1])
        .range([0,innerChart.height])

    //nice make the axis later better number
    //left for lost
    const xScaleLeft = d3.scaleLinear()
        .domain([per_max,0])
        .range([0,innerChart.width/2])
        .nice()

    const xScaleRight = d3.scaleLinear()
        .domain([0,per_max])
        .range([0,innerChart.width/2])
        .nice()

    const xAxisLeft = d3.axisBottom(xScaleLeft)
        .tickSize(1)
        .tickFormat(d3.format(".1%"))
        // .tickFormat(d=> d === 0 ? "": d)

    const xAxisRight = d3.axisBottom(xScaleRight)
        .tickSize(1)
        .tickFormat(d3.format(".1%"))

    const yAxis = d3.axisLeft(yScale)
        .tickSize(1)
        .tickSizeOuter(0)
        // .tickFormat(d=> d === 0 ? "": d)
    // start drawing

    const svg = d3.select('#pyramid')
        .append('svg')
        .attr('id','pyramid')
        .attr('viewBox',`0 0 ${chartArea.width} ${chartArea.height}`)
        .style('background-color','pink');
 
    const baseRight = svg
        // .selectAll('g')
        // .data(bins_data)
        // .join('g')
        .append('g')
        .attr('class','histogram-injured')
        .attr('transform',`translate(${margin.horizontal+innerChart.width/2}, ${margin.vertical})`);

    // // const bar = base.append('rect')
    const barRight = baseRight.selectAll('rect')
        .data(bins_injured)
        .join('rect')
        .attr('width', d=> xScaleRight(d.length/sum_injured)- xScaleRight(0))
        .attr('height',d=> yScale(d.x1)-yScale(d.x0))
        .attr('x',d=>xScaleRight(0))
        .attr('y',d=>yScale(d.x0))
        .attr('fill','darkblue')
        .attr('stroke','white')
        .attr('stroke-width',0.1)


    const baseLeft = svg
        // .selectAll('g')
        // .data(bins_data)
        // .join('g')
        .append('g')
        .attr('class','histogram-lost')
        .attr('transform',`translate(${margin.horizontal}, ${margin.vertical})`);

    const barLeft = baseLeft.selectAll('rect')
        .data(bins_lost)
        .join('rect')
        .attr('width', d=> xScaleLeft(0) - xScaleLeft(d.length/sum_lost))
        .attr('height',d=> yScale(d.x1)-yScale(d.x0))
        .attr('x',d=>xScaleLeft(d.length/sum_lost))
        .attr('y',d=>yScale(d.x0))
        .attr('fill','brown')
        .attr('stroke','white')
        .attr('stroke-width',0.1)

    
    //add axis
    svg.append('g')
       .call(xAxisLeft)
        .attr('font-size', '1.5px')
        .attr('class','x-axis-bar')
        .style("stroke-width", "0.2px")
        .attr('transform',`translate (${margin.horizontal},${innerChart.height+margin.vertical})`)

    svg.append('g')
       .call(xAxisRight)
        .attr('font-size', '1.5px')
        .attr('class','x-axis-bar')
        .style("stroke-width", "0.2px")
        .attr('transform',`translate (${margin.horizontal + innerChart.width/2},${innerChart.height+margin.vertical})`)


    svg.append('g')
       .call(yAxis)
        .attr('font-size', '1.5px')
        .attr('class','y-axis-bar')
        .style("stroke-width", "0.2px")
        .attr('transform',`translate (${margin.horizontal},${margin.vertical})`)

    // svg.selectAll(".tick")
    // .filter(function (d) { return d == 0;  })
    // .remove();

    svg.append('text')
        .text('Hours')
        .attr('font-size', '2px')
        .attr('dominant-baseline','hanging')
        .attr('y','3px')

    svg.append('text')
        .text('Percentage of Incidents')
        .attr('font-size', '2px')
        .attr('x',chartArea.width-margin.horizontal)
        .attr('y',chartArea.height-2)
        .attr('text-anchor','end')
 }