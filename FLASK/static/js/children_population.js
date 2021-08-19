d3.csv("https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/population_aged_0_14_years_total_number--by--global--time.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}
  
  var frames = []
  var x = unpack(rows, 'time')
  var y = unpack(rows, 'population_aged_0_14_years_total_number')

  var n = 1200;
  for (var i = 0; i < n; i++) { 
    frames[i] = {data: [{x: [], y: []}]}
    frames[i].data[0].x = x.slice(0, i+1);
    frames[i].data[0].y = y.slice(0, i+1);
  }

  Plotly.newPlot('child_total', [{
    x: frames[1].data[0].x,
    y: frames[1].data[0].y,
    fill: 'tonexty',
    type: 'scatter',
    mode: 'lines',
    line: {color: '#A1280C'},
  }], {
    xaxis: {
      type: 'year', 
      range: [
      frames[150].data[0].x[0], 
      frames[150].data[0].x[150]
      ],
      showgrid: true,
      showline: true,
      showticklabels: true,
      zeroline: true,
      },
   
    yaxis: {
      range: [
        800000000, 
        2090000000
      ],
      showgrid: true,
      showline: true,
      showticklabels: true,
      zeroline: true
    },
    annotations: [{
      showarrow: false,
      text: "<b>In 2100, there will be approximately 2 billion children in the world</b>",
      font: {
      family: 'Gravitas One',
      size: 25,
      color: 'white'
      },
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: 0.5
    }, {
      showarrow: false,
      text: "<b>That’s about the same number of children in the year 2000!</b>",
      font: {
        family: 'Gravitas One',
        size: 25,
        color: 'white'
      },
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: 0.35
    }]
  }).then(function() {
    Plotly.animate('child_total', frames, {
      transition: {
        duration: 0
      },
      frame: {
        duration: 20,
        redraw: false
      }
  });
  });
  
}) 