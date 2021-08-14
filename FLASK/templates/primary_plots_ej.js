var data = "/api/primary-school"

// Trace1 for the Primary Data
var trace1 = {
    x: data.map(row => row.year),
    y: data.map(row => row.primary_school_boys),
    name: "Boys",
    type: "lines"
  };
  
  // Trace 2 for the Roman Data
  var trace2 = {
    x: data.map(row => row.year),
    y: data.map(row => row.primary_school__girls),
    name: "Girls",
    type: "lines"
  };
  
  // Combining both traces
  var traceData = [trace1, trace2];
  
  // Apply the group barmode to the layout
  var layout = {
    title: {
      text:'Low Income Countries Primary School Completion Rate',
      font: {
            family: 'Droid Sans Mono, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Year',
        font: {
          family: 'Droid Sans Mono, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Percent (%)',
        font: {
          family: 'Droid Sans Mono, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", traceData, layout);