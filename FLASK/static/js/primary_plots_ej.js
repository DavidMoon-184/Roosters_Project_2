d3.csv("https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/avg_primary_completion_male_female.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  var frames = []
  var x = unpack(rows, 'time')
  var y = unpack(rows, 'primary_school_completion_percent_of_boys')
  var x2 = unpack(rows, 'time')
  var y2 = unpack(rows, 'primary_school_completion_percent_of_girls')
  
  var n = 1000;
  for (var i = 0; i < n; i++) { 
    frames[i] = {data: [{x: [], y: []}, {x: [], y: []}]}
    frames[i].data[1].x = x.slice(0, i+1);
    frames[i].data[1].y = y.slice(0, i+1);
    frames[i].data[0].x = x2.slice(0, i+1);
    frames[i].data[0].y = y2.slice(0, i+1);
  }
  
  var trace2 = {
    type: "scatter",
    mode: 'lines+markers',
    name: 'Boys',
    fill: 'tonexty',
    x: frames[1].data[1].x,
    y: frames[1].data[1].y,
    line: {color: '#57648C'}
  }

  var trace1 = {
    type: "scatter",
    mode: 'lines+markers',
    name: 'Girls',
    x: frames[0].data[0].x,
    y: frames[0].data[0].y,
    line: {color: '#934A5F'}
  }

  var data = [trace1,trace2]; 
    
  var layout = {
    // title: 'What percentage of low income childrens finish their primary school?',
    
    xaxis: {
      range: [1969, 2019],
    title: {type: 'year',
      text: 'Year',
    },
      showgrid: true
    },  
    yaxis: {
      range: [0, 100],
      title: {type: 'percent',
      text: 'Percentage',
    },
      showgrid: true
    },
    legend: {
      orientation: 'h',
      x: 0.5,
      y: 1.2,
      xanchor: 'center'
    },
    updatemenus: [{
      x: 0.5,
      y: 0,
      yanchor: "top",
      xanchor: "center",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: {"t": 87, "r": 10},
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 0,
          },
          frame: {
            duration: 90,
            redraw: false
          }
        }],
        label: "Play"
      }, {
        method: "animate",
        args: [
          [null],
          {
            mode: "immediate",
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        ],
        label: "Pause"
      }]
    }]
  };

  Plotly.newPlot('primary_plot', data, layout).then(function() {
    Plotly.addFrames('primary_plot', frames);
  });
})