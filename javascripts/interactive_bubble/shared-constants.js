// Chart
const margin = {top: 50, right: 50, bottom: 50, left: 30};
const width = 1200;
const height = 550;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let innerChart;

// Selectors
const locationFilters = [
  { id: "all", label: "All location", isActive: true },
  { id: "scafell-pike", label: "Scafell Pike", isActive: false },
  { id: "screes", label: "Wast Water Screes", isActive: false },
  { id: "gable", label: "Great Gable", isActive: false },
  { id: "other", label: "Other", isActive: false },

];


// declare time parser with format using d3.function
const parseDate = d3.timeParse("%d/%m/%Y")
const parseMonthDate = d3.timeParse("%d/%m")
const parseYearMonth = d3.timeParse("%m/%Y")
const parseYear = d3.timeParse("%Y")

function dateConverter (data) {
    for (let i = 0; i < data.length; i++){
        data[i].date = parseDate(data[i].day + '/' + data[i].month + '/' + data[i].year)
        data[i].month_day = parseMonthDate(data[i].day + '/' + data[i].month)
        data[i].year_month = parseYearMonth(data[i].month + '/' + data[i].year)

    }
    return data;
} 

function labelCentre (d){
        const currentMonthDate = parseMonthDate(`${d.getDate()}/${d.getMonth()+1}`)
        const nextMonthDate = parseMonthDate(`${d.getDate()}/${d.getMonth()+2}`)
        return ((xScale(nextMonthDate) - xScale(currentMonthDate))/2)
    } 

// Incident cause
const incidentCause = [
   { id: "Cragfast", label: "Cragfast - walkers being stuck at a spot and could not move out of it, it could be on a steep slope, a craggy ravine or unstable screes", color: "#5778a4" },
   { id: "Injured & Medical", label: "Injury & Medical - walkers, their company, or passers-by calling for help when there is injury or medical conditions", color: "#e49444" },
   { id: "Lost", label: "Lost - walkers calling for help when they could not find their way", color: "#d1615d" },
   { id: "Other", label: "Other - assisting local emergency, saving dog in distress on mountains, rescuing people from lakes, clearing road during winter, assisting flood rescues and other events not directly related to walkers", color: "#85b6b2" },
   { id: "Overdue", label: "Critically Endangered", color: "#6a9f58" },
];


// Scales
let yScale;
let colorScale;
let xScale;
let rScale;

let dataset