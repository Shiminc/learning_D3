const drawScatterplot = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr('class','chart_area');

  /*******************************/
  /*    prepare data   */
  /*******************************/
    const hrs_array = data.map(d=>d.total_hrs)
    const month_day_array = data.map(d=>d.month_day)
    const year_month_array = data.map(d=>d.year_month)
    const year_array = data.map(d=>d.year)
    const incident_array = data.map(d=>d.Incident_Cause)
    const incident_unique = [...new Set(incident_array)]

  /****************************/
  /*    Declare the scales    */
  /****************************/
  // Y scale
  // to make 2025 at the top, and include 2014 to have space between axis and 2015
    yScale = d3.scaleLinear()
                  .domain([2025,2015])
                  .range([0,innerHeight])

    xScale = d3.scaleTime()
                    .domain([parseMonthDate('01/01'),parseMonthDate('31/12')])
                    .range([0, innerWidth]);

    // colorScale = d3.scaleOrdinal()
    //                     .domain(incident_unique)
    //                     .range(d3.schemeTableau10)

    colorScale = d3.scaleOrdinal()
        .domain(incidentCause.map(d => d.id))
        .range(incidentCause.map(d => d.color))

      // Radius scale
    const maxTotalHrs = d3.max(data, d => d.total_hrs);
    rScale = d3.scaleRadial()
        .domain([0, maxTotalHrs])
        .range([0, 20]);


 /******************************/
  /*     Append the circles     */
  /******************************/

         const bubble = innerChart
                .selectAll('circle')
                .data(data)
                .join('circle')
                    .attr('class','bubbles')
                    .attr("cx", d => xScale(d.month_day) )          
                    .attr("cy", d => yScale(d.year) )
                    .attr("r",  d => rScale(d.total_hrs))
                    .attr('opacity', 0.5)
                    .attr('fill',d => colorScale(d.Incident_Cause))

                    


  /***************************/
  /*     Append the axes     */
  /***************************/
  // Bottom axis

    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .tickFormat(d3.timeFormat("%b"));

    const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickFormat(d3.format("d"));

    const bottomAxis = innerChart.append('g')
                        .attr("class", "axis-x")
                        .attr('transform',`translate(0, ${innerHeight})`)
                        .call(xAxis)

    const leftAxis = innerChart.append('g')
    				.attr("class", "axis-y")
                    .call(yAxis)

    //style x-axis label, centre the label
    d3.selectAll(".axis-x text")
        .attr('y','10px')
        .attr('x', d => labelCentre(d))

  // Add label to the axes
  svg
    .append("text")
      .text("Month")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "hanging")
      .attr("x", margin.left + innerWidth )
      .attr("y", height - margin.bottom + 12)
      .style("font-size", "12px");
  svg
    .append("text")
      .text("Year")
      .attr("dominant-baseline", "hanging")
      .attr("y", margin.top - 18)
      .style("font-size", "12px");             
}