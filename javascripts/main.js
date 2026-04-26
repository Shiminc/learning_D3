import {drawBarLabelSeparately} from './drawBarLabelSeparately.js'; 
import {drawWithGroup} from './drawWithGroup.js';

//weather data
let data
async function main() {
  try {
    data = await d3.json("../data/weather.json");
    console.log(data.length);
    // drawBarLabelSeparately(data)
    drawWithGroup(data)
  } catch(e) {
    console.log(e);
  }
   
};

main(); 
