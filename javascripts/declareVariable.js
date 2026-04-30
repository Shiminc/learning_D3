    //ratio for the viewbox of svg
    export const svg_width = 600
    export const svg_height = 400
    export const chart ={'width':600,
          'height':400,
          'left_padding':100,
          'right_padding': 50,
          'top_padding':50,
          'bottom_padding':50  
    }
    // const chart_width = 500
    // const chart_height = 400
    // const chart_left_margin = 75
    // const chart_right_margin = 25
    
    // 0.2 percent of the bar height
    export const padding_between_bar = 0.2

    export const margin = {
      top: 50,
      right: 100,
      bottom: 50,
      left:50
    }

    // calculate innerChart properties 
export const innerChart = {
    'width' : svg_width - margin.left - margin.right,
    'height' : svg_height - margin.top - margin.bottom
}
