const dataset_heatmap = [
    [0,0],
    [1,0],
    [2,0],
    [0,1],
    [1,1],
    [2,1],
    [0,2],
    [1,2],
    [2,2]
]

// chart setting
const chart_heatmap = {
  'height' : 600,
  'width' : 600
}

const margin_heatmap = {
  'left': 50, 
  'right': 50,
  'top': 50,
  'bottom': 50
}


function createHeatmap (data){
    const x_array = data.map(d=>d[0])
    const y_array = data.map(d=>d[1])

    const xScale = d3.scaleLinear()
        .domain([0,2])
        .range([0,chart_heatmap.width-200])
    
    const yScale = d3.scaleLinear()
        .domain([0,2])
        .range([chart_heatmap.height-200,0])

    const svg = d3.select('#heat_map')
        .append('svg')
            .attr('viewBox',`0 0 ${chart_heatmap.width} ${chart_heatmap.height}`)
            .style('border','1px solid black');
    console.log('this is svg')
    console.log(svg)
    const base = svg
      .append('g')
      //decide position y for each bar & label TODO test using x, y
        .attr('class','heatmap_base')
        // .attr('transform', d=> `translate(${margin_heatmap.left}, ${margin_heatmap.top})`)

    const data_base = base
    .selectAll('g')
      .data(data)
      .join('g')

    const square = data_base.append('rect')
        .attr('x',d=>xScale(d[0]))
        .attr('y',d=>yScale(d[1]))
        .attr('stroke','red')
        .attr('width',200)
        .attr('height',200)
    
    }

createHeatmap(dataset_heatmap);