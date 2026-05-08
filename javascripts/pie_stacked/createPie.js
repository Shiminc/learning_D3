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
        const seasonData = data.filter(d=>d.season === seasons[i]);
        // console.log(seasonData)
        const annotatedData = pieGenerator(seasonData)
        // console.log(annotatedData)

        const donutContainer = svg
            .append('g')
            .attr('class',`donut-${seasons[i]}`)
            
        const donut = donutContainer
            .selectAll(`donut-${seasons[i]}`)
            .data(annotatedData)
            .join('g')            
            .attr('transform',`translate(${xScale(centres[i])+margin.horizontal},${chart.height/2+margin.vertical})`)
            .attr('class',`pieces-${seasons[i]}`)
            
            // .append('circle')
            // .attr('cx',0)
            // .attr('cy',0)
            // .attr('r','2px')

        const arcs = donut
            .append('path')
            .attr('class',`donut-${seasons[i]}`)
            .attr('d',arcGenerator)
            .attr('fill',d=>colorScale(d.data.Incident_Cause));

        const labels = donut
            .append('text')
            .text(d=>d.data.count)
            .attr('x',chart.width/2)
            .attr('y',chart.height/2)
            .attr('fill','black')
            .attr('font-family','sans-serif')
            .attr('font-size','10px')
    }




}

// export const svg = d3.select('#heat_map')
//         .append('svg')
//             .attr('viewBox',`0 0 ${chart.width} ${chart.height}`)
//             .style('border','1px solid black');
//     console.log('this is svg')
//     console.log(svg)
