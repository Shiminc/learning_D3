import {innerChart, chartArea, margin, binGenerator, yScale_update} from './variable.js'

export let filters = [
    {id: 'all', label: 'All', isActive: true},
    {id:'Lost', label:'Lost', isActive: false},
    {id:'Injured & Medical', label:'Injured & Medical', isActive: false},
    {id:'Overdue', label:'Overdue', isActive: false},
    {id:'Cragfast', label:'Cragfast', isActive: false},
    {id:'Other', label:'Other', isActive: false},

]

function updateData(selected,data) {
    console.log(selected)
    let selected_data;
    if (selected=='All') {
         console.log('select all')
         selected_data = data;
    } else {
        console.log('select any')
        selected_data = data.filter(data=> (data.Cause===selected));
        console.log(selected_data)

    }
        let bin_selected_data = binGenerator(selected_data)
        d3.selectAll('#histogram rect')
        .data(bin_selected_data)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('y',d=>yScale_update(d.length))
        .attr('height',d=> yScale_update(0)-yScale_update(d.length))


};

export function populateFilters(filters,data){
        const buttonFilters = d3.select('.filters-button')
        .selectAll('button')
        .data(filters)
        .join('button')
            .attr('class', d=>`filter ${d.isActive ? 'active':""}`)
            .text(d=>d.label)
            // .on('mouseover',function(){
            //     d3.select(this)
            //         .style('background-color','orange')
            // })
            // .on('mouseout',function(){
            //     d3.select(this)
            //         .transition()
            //         .duration(500)
            //         .style('background-color','green')

            // })
            .on('click', function(e, d){
                // d3.select(this)
                //     .style('background-color', 'black')

                console.log('DOM event',e);
                console.log('Attached datum',d);
                if (!d.isActive){
                    updateData(d.label,data)
                    filters.forEach(filter => {
                        filter.isActive = d.id === filter.id ? true : false;
                    })
                    d3.selectAll('.filter')
                    .classed('active',filter=>filter.id===d.id? true: false);
                    // filters.fo
                }
            });
      
}


