d3.csv("https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/population_aged_0_14_years_both_sexes_percent--by--global--time.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


var trace1 = {
  mode: "lines",
  name: 'aged 0-14 male population (%)',
  text:'aged 0-14 male population (%)',
  x: unpack(rows, 'time'),
  y: unpack(rows, 'population_aged_0_14_years_male_percent'),
  line: {color: '#57648C'},
  type: "scatter"
}

var trace2 = {
  mode: "lines",
  name: 'aged 0-14 female population (%)',
  text:'aged 0-14 female population (%)',
  x: unpack(rows, 'time'),
  y: unpack(rows, 'population_aged_0_14_years_female_percent'),
  line: {color: '#BA4125'},
  type: "scatter"
}

var data = [trace1,trace2];

var layout = {
  title: 'Population Rate Of Children (0-14 Years) Over Time',
  
  xaxis: {
    title: {
      range: ['1950', '2100'],
    type: 'year',
      text: 'Year',
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
  },

  yaxis: {
    title: {
      text: 'Population Rate',
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
};


Plotly.newPlot('child_ratio', data, layout);
})


