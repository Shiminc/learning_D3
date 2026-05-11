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

// order/key for the stack bar chart generator
export const incident_cause =['Injured & Medical','Lost','Overdue','Cragfast','Other']
// scale

export const xScale = d3.scaleBand()
        .domain([3,4,5,6,7,8,9,10,11,12,1,2])
        .range([0,chart.width])
        .paddingInner(0.2)

export const colorScale = d3.scaleOrdinal()
        .domain(['Cragfast','Injured & Medical','Lost','Other','Overdue'])
        .range(d3.schemeTableau10)

const colorLegend = ['Cragfast','Injured & Medical','Lost','Other','Overdue']

export function createLegend (){

    //base with data for legend
    const legendItems = d3.select('.legend-container')
        .append('ul')
            .attr('class','color-legend')
        .selectAll('.color-legend-item')
        .data(colorLegend)
        .join('li')
            .attr('class','color-legend-item');

    legendItems
        .append('span')
            .attr('class','color-legend-item-color')
            .style('background-color', d => colorScale(d))

    legendItems
        .append('span')
            .attr('class','color-legend-item-label')
            .text(d=>d)


}