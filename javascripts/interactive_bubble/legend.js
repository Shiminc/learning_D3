const populateLegend = () => {

  // Conservation statuses
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

}