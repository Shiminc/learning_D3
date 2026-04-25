import {drawBarLabelSeparately} from './drawBarLabelSeparately.js'; 
import {drawWithGroup} from './drawWithGroup.js';


let data
async function main() {
  try {
    data = await d3.json("../data/weather.json");
    console.log(data);
    // drawBarLabelSeparately(data)
    drawWithGroup(data)
  } catch(e) {
    console.log(e);
  }
};

main(); 
