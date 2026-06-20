const populateLegend = () => {

  // Incident Cause - color
  const incident = d3.select(".legend-incident-cause")
    .append("ul")
    .selectAll(".incident-cause")
    .data(incidentCause)
    .join("li")
      .attr("class", "incident-cause");

  incident
    .append("svg")
      .attr("width", 20)
      .attr("height", 20)
    .append("circle")
      .attr("cx", 10)
      .attr("cy", 13)
      .attr("r", 5)
      .attr("fill", d => d.color)
      .attr('fill-opacity', 0.6)
      .attr("stroke", d => d.color)
      .attr("stroke-width", 2);

  incident
    .append("span")
    .text("     ")
  incident
    .append("span")
      .text(d => d.label)
      .attr('font-size','60px');


  // total hrs - area
  const totalHrsBand = [
    {hrs:10},
    {hrs:50},
    {hrs:100},
    {hrs:200},
    {hrs:400},
    {hrs:800}
  ]
  const totalHrs = d3.select(".legend-total-hours")
    .append('svg')
      .attr("viewBox", `0, 0, ${width}, ${rScale(800)*3.14*2}`)

    .selectAll(".total-hours")
    .data(totalHrsBand)
    .join("g")
      .attr("class", "total-hours");

    totalHrs.append('circle')
      .attr("cx", function(d,i){
        return (i+1)*rScale(800)*3.14
      }) 
      .attr("cy", rScale(800)*3.14/2)
      .attr("r", d => rScale(d.hrs))
      .attr("fill", d => d.color)
      .attr('fill-opacity', 0.5)
      .attr("stroke", d => d.color)
      .attr("stroke-width", 2);

  totalHrs.append('text')
    // .text(d =>`${d.hrs} hours`)
    .text(d =>d.hrs)  
    .attr("x", function(d,i){
        return (i+1)*rScale(800)*3.14
      })    // .attr("y", rScale(800)*3.14)
    .attr("y", rScale(800)*3.14)
    .attr('text-anchor','middle')
}

