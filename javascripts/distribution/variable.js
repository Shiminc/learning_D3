// chart setting
export const innerChart = {
  'height' : 50,
  'width' : 100
}

export const margin = {
    'horizontal': 7,
    'vertical':7

}
export const chartArea = {
    'width': `${innerChart.width + margin.horizontal*2}`,
    'height': `${innerChart.height + margin.vertical*2}`,
}

export const binGenerator = d3.bin().value(d=>d.Hours)

// due to initial design so manual here
export const yScale_update = d3.scaleLinear()
        .domain([366,0])
        .range([0,innerChart.height])
        .nice()
