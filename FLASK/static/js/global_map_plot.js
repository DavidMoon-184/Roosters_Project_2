d3.json("https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/primary_completion_world.csv", function(err, rows){

  function filter_and_unpack(rows, key, year) {
  return rows.filter(row => row['time'] == year).map(row => row[key])
  }

  var frames = []
  var slider_steps = []

  var n = 10;
  var num = 1970;
  for (var i = 0; i <= n; i++) {
    var z = filter_and_unpack(rows, 'primary_completion_rate_total_percent_of_relevant_age_group', num)
    var locations = filter_and_unpack(rows, 'Country Code', num)
    frames[i] = {data: [{z: z, locations: locations, text: locations}], name: num}
    slider_steps.push ({
        label: num.toString(),
        method: "animate",
        args: [[num], {
            mode: "immediate",
            transition: {duration: 100},
            frame: {duration: 100}
          }
        ]
      })
    num = num + 5
  }

var data = [{
      type: 'choropleth',
      locationmode: 'world',
      locations: frames[0].data[0].locations,
      z: frames[0].data[0].z,
      text: frames[0].data[0].locations,
      zauto: false,
      zmin: 30,
      zmax: 90

}];
var layout = {
    title: 'World Primary School Completion Rate',
    width: 1000,
    height: 600,
    geo:{
       scope: 'world',
       countrycolor: 'rgb(255, 255, 255)',
       showland: true,
       landcolor: 'rgb(217, 217, 217)',
       showlakes: true,
       lakecolor: 'rgb(255, 255, 255)',
       subunitcolor: 'rgb(255, 255, 255)',
       lonaxis: {},
       lataxis: {}
    },
    updatemenus: [{
      x: 0.1,
      y: 0,
      yanchor: "top",
      xanchor: "right",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: {"t": 87, "r": 10},
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 200,
          },
          frame: {
            duration: 500
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
              duration: 0
            }
          }
        ],
        label: "Pause"
      }]
    }],
    sliders: [{
      active: 0,
      steps: slider_steps,
      x: 0.1,
      len: 0.9,
      xanchor: "left",
      y: 0,
      yanchor: "top",
      pad: {t: 50, b: 10},
      currentvalue: {
        visible: true,
        prefix: "Year:",
        xanchor: "right",
        font: {
          size: 20,
          color: "#666"
        }
      },
      transition: {
        duration: 300,
        easing: "cubic-in-out"
      }
    }]
};

Plotly.newPlot('myDiv', data, layout).then(function() {
    Plotly.addFrames('myDiv', frames);
  });
})