// chart setting
export const chart = {
  'height' : 30,
  'width' : 160
}

export const margin = {
    'horizontal': 5,
    'vertical':5

}
export const whole_chart = {
    'width': `${chart.width + margin.horizontal*2}`,
    'height': `${chart.height + margin.vertical*2}`,
}

// scale

export const xScale = d3.scaleBand()
        .domain([0,1,2,3,4,5,6,7,8,9,10,11])
        .range([margin.horizontal,chart.width])
        .paddingInner(0.2)

export const colorScale = d3.scaleOrdinal()
        .domain(['Cragfast','Injured & Medical','Lost','Other','Overdue'])
        .range(d3.schemeTableau10)


// export const innerChart = svg.append('g')
//             .attr('class','innerChart')
//             .attr('transform', d=> `translate(${margin.horizontal}, ${margin.vertical})`)






    
// export const yScale = d3.scaleLinear()
//         .domain([0,9])
//         .range([chart_heatmap.height,0])

// export const colorScale = d3.scaleOrdinal()
//                         .domain([0,8])
//                         .range(d3.schemeOranges[9]);
    

// // spell out the domain to make sure the color match one by one rather than the above. if use above, if you have to initiatialise to match the colour by for example console.log
// export const colorScale = d3.scaleOrdinal()
//                         .domain([0,1,2,3,4,5,6,7,8])
//                         .range(d3.schemeOranges[9]);

