

//Main
d3.json('../data/trend.json').then(
  data => {
  // put any function here
   console.log(data)
  })
.catch(error => console.log(error));

//