import {createPie} from './createPie.js'
import {createStackedBar} from './createStackedBar.js'

d3.json('./data/season_cause.json')
.then(data => {

   createPie(data)
  })
.catch(error => console.log(error));
    

d3.json('./data/month_cause.json')
.then(data => {

  createStackedBar(data)
  })
.catch(error => console.log(error));