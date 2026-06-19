import {createHistogram} from './histogram.js'
import {createPyramid} from './pyramid.js'
import {filters, populateFilters} from './filter.js'

d3.json('../data/full_data.json').then(
    
    dataset => {
        // only picked the fields needed
        const data = dataset.map(d=>{ 
            return {
                'Incident': d.Incident,
                'Cause': d.Incident_Cause,
                'Hours':d.hrs
            }
        })
        console.table(filters)
        createHistogram(data)

        populateFilters(filters,data)
        createPyramid(data)

    })

.catch(error => console.log(error));
