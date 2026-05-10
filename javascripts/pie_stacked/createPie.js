import {xScale, colorScale, chart, margin, whole_chart } from './variable.js'

// define centre for 4 season donut based on month_order [0,12]
const centres = [1,4,7,10]
const seasons = ['Spring','Summer','Autumn','Winter']

// function createSeasonData (data, season){
//     let count_array = []
//     let cause_array = []
//     for (let datum of data) {
//         if (datum.season == season) {
//             count_array.push(datum.count)
//             cause_array.push(datum.Incident_Cause)
//         }
//     }
//     return [count_array, cause_array]
// }


function calculatePercentagePrior (data) {
    data.forEach( (d) => {
        d['percentage'] = (d.endAngle - d.startAngle) / (2*Math.PI);
    }
    )
}

// function calculateCentroidPrior (data) {
//     data.forEach( (d) => {
//         d['centroid'] = arcGenerator.startAngle(d.startAngle).endAngle(d.endAngle).centroid();
//     }
//     )
// }

function calculateCentroid (d) {
    let centroid = arcGenerator.startAngle(d.startAngle).endAngle(d.endAngle).centroid()
    return centroid 
}

export function createPie (data){

    // the full chart area that will contain all 4 donuts
    const svg = d3.select('#pie_chart')
    .append('svg')
        .attr('id','svg-pie')
        .attr('viewBox',`0 0 ${whole_chart.width} ${whole_chart.height}`)
        .style('background-color','skyblue')

    //I skipped one step of g containing all 4 donuts

    // create g for each donut
    for (let i= 0; i<4;i++){
        console.log('centre', centres[i])

        //These two generators have to be initialise everytime inside the for loop perhaps because of different data
        // used to generate the start and end angle for each piece/arc of the donut/pie
        const pieGenerator = d3.pie()
        .value(d=>d.count);

        // used to generate the path d to draw
        const arcGenerator = d3.arc()
        .startAngle(d => d.startAngle)
        .endAngle(d => d.endAngle)
        .innerRadius(6)
        .outerRadius(10)
        .padAngle(0.02)
        .cornerRadius(0);

        let seasonData = data.filter(d=>d.season === seasons[i]);
        // console.log(seasonData)
        let annotatedData = pieGenerator(seasonData)
        console.log(annotatedData)

        //calculate percentage and centroid for labels
        calculatePercentagePrior (annotatedData)
        // calculateCentroid (annotatedData)
        console.log(annotatedData)

        //individual donut
        let donutContainer = svg
            .append('g')
            .attr('class',`donut-${seasons[i]}`)
            .attr('transform',`translate(${xScale(centres[i])+margin.horizontal},${chart.height/2+margin.vertical})`)
        
        //binding data
        let donut = donutContainer
            .selectAll(`donut-${seasons[i]}`)
            .data(annotatedData)
            .join('g')            
            .attr('class',`pieces-${seasons[i]}`)
        
        //drawing each piece of the donut
        donut
            .append('path')
            .attr('class', d => `piece-${d.data.Incident_Cause}`)
            .attr('d',arcGenerator)
            .attr('fill',d=>colorScale(d.data.Incident_Cause))

                
        donut
            .append('text')
                .attr('class', d => `label-${d.data.Incident_Cause}`)
                .text(d => d3.format('0.1%')(d.percentage))
                .attr('x', d=>{
                    d['centroid'] = arcGenerator
                    .startAngle(d.startAngle)
                    .endAngle(d.endAngle)
                    .centroid();
                    return d.centroid[0]
                })
                .attr('y', d=>d.centroid[1])
                .attr('text-rendering','optimizeLegibility')
                .attr('text-anchor','middle')
                .attr('dominant-baseline','middle')
                .attr('fill','black')
                .attr('font-family','sans-serif')
                .attr('font-size','1px')

        let season_labels = donutContainer
            .append('text')
            .text(seasons[i])
            .attr('fill','black')
            .attr('font-family','sans-serif')
            .attr('font-size','3px')
            .attr('text-rendering','optimizeLegibility')
            .attr('text-anchor','middle')
            .attr('dominant-baseline','middle')
        console.log('after',annotatedData)
    }




}

