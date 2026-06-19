d3.json("../data/full_data.json")
.then(data => {
    
  // put any function here
  dataset = dateConverter(data)
   console.table(dataset)
  drawScatterplot(dataset)
  populateLegend()
  })
.catch(error => console.log(error));