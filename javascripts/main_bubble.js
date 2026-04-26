import {dateConverter, drawBubble} from './drawBubble.js';

let dataset


d3.json("../data/full_data.json")
.then(data => {
    
  // put any function here
   console.log(data)
   dataset = dateConverter(data)
   console.log(dataset)
   drawBubble(dataset)

  })
.catch(error => console.log(error));

