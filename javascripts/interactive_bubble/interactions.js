function showHyperlink(e,d){
    window.open(d.url,"_blank")
}

function createTooltips () {
    const bubbleTooltips = d3.select('#scatterplot')
    .selectAll('circle')
    // .on('mouseenter',showTooltips)
    // .on('mouseleave',hideTooltips)
    .on('click',showHyperlink)

}

const selection = ['Scafell Pike', 'Great Gable', 'Wast Water Screes']
const populateFilters = () => {

  const filters = d3.select("#filters")
    .selectAll(".filter")
    .data(locationFilters)
    .join("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`);


  filters
    .append("span")
      .attr("class", "filter-text")
      .text(d => d.label);

};

const t = d3.transition()
          .duration(800)
          .ease(d3.easeExpOut);

function updateData(data, selectedLabel) {
  let selectedData

  if (selectedLabel=='All location') {
         console.log('select all')
         selectedData = data;
    } 
  else if (selectedLabel=='Other')
     {
        console.log('select other')
        
        selectedData = data.filter(d=> !selection.includes(d.Location));

    }
  else {
        selectedData = data.filter(d=> (d.Location==selectedLabel));

  }
      console.log(selectedData)

      return selectedData;

}

function updateChart (updatedData){
      innerChart
          .selectAll("circle")
          // the default d3 setting to move circles 
          // .data(updatedData)
          // d3 just make those not selected disappear, keep those selected at original place
          .data(updatedData, d=>d.Incident)
          .join("circle")
          .transition()
          .duration(800)
          .ease(d3.easeExpOut)

                   .attr('class','bubbles')
                    .attr("cx", d => xScale(d.month_day))
                    .attr("cy", d => yScale(d.year) )
                    .attr("r",  d => rScale(d.total_hrs))          
                    .attr('opacity', 0.5)
                    .attr('fill',d => colorScale(d.Incident_Cause))
}

//book way
function updateChartFancy (updatedData){
      innerChart
          .selectAll("circle")
          .data(updatedData, d=>d.Incident)
          .join(
            enter=>enter
              .append('circle')
                   .attr('class','bubbles')
                    .attr("cx", d => xScale(d.month_day))
                    .attr("cy", d => -50)
                    .attr("r",  0)          
                    .attr('fill-opacity', 0.5)
                    .attr('fill',d => colorScale(d.Incident_Cause))
                    .style('opacity',0)
              .call(enter=>enter.transition()
                    .duration(800)
                    .attr("cy", d => yScale(d.year) )
                    .attr("r",  d => rScale(d.total_hrs))    
                    .style('opacity',1)       
              ),
              update=>update,
              exit => exit
              .call(exit=>exit.transition()
                .duration(800)
                .attr('cy',d=>innerHeight)
                .attr('r',0)
                .style('opacity',0)
                .remove()
            )
          )
}



const handleClickOnFilter = (data) => {

  d3.selectAll(".filter")
    .on("click", (e, datum) => {
      console.log(datum)
      if (!datum.isActive) {

        // Update filters
        locationFilters.forEach(h => {
          h.isActive = h.id === datum.id ? true : false;
        });
        d3.selectAll(".filter")
          .classed("active", d => d.id === datum.id ? true : false);

        // Update scatterplot
        const updatedData = updateData(data,datum.label)

        updateChartFancy (updatedData)
          
}})
};