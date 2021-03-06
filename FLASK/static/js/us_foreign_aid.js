var initialData,
  chart;
const startYear = 2001,
  endYear = 2021,
  btn = document.getElementById('play-pause-button'),
  input = document.getElementById('play-range');

/**
 * Animate dataLabels functionality
 */
(function(H) {
  const FLOAT = /^-?\d+\.?\d*$/;

  // Add animated textSetter, just like fill/strokeSetters
  H.Fx.prototype.textSetter = function(proceed) {
    var startValue = this.start.replace(/ /g, ''),
      endValue = this.end.replace(/ /g, ''),
      currentValue = this.end.replace(/ /g, '');

    if ((startValue || '').match(FLOAT)) {
      startValue = parseInt(startValue, 10);
      endValue = parseInt(endValue, 10);

      // No support for float
      currentValue = Highcharts.numberFormat(
        Math.round(startValue + (endValue - startValue) * this.pos), 0);
    }

    this.elem.endText = this.end;

    this.elem.attr(
      this.prop,
      currentValue,
      null,
      true
    );
  };

  // Add textGetter, not supported at all at this moment:
  H.SVGElement.prototype.textGetter = function(hash, elem) {
    var ct = this.text.element.textContent || '';
    return this.endText ? this.endText : ct.substring(0, ct.length / 2);
  }

  // Temporary change label.attr() with label.animate():
  // In core it's simple change attr(...) => animate(...) for text prop
  H.wrap(H.Series.prototype, 'drawDataLabels', function(proceed) {
    var ret,
      attr = H.SVGElement.prototype.attr,
      chart = this.chart;

    if (chart.sequenceTimer) {
      this.points.forEach(
        point => (point.dataLabels || []).forEach(
          label => label.attr = function(hash, val) {
            if (hash && hash.text !== undefined) {
              var text = hash.text;

              delete hash.text;

              this.attr(hash);

              this.animate({
                text: text
              });
              return this;
            } else {
              return attr.apply(this, arguments);
            }
          }
        )
      );
    }


    ret = proceed.apply(this, Array.prototype.slice.call(arguments, 1));

    this.points.forEach(
      p => (p.dataLabels || []).forEach(d => d.attr = attr)
    );

    return ret;

  });
})(Highcharts);

/**
 * Calculate the data output
 */

function getData(year) {
  let output = Object.entries(initialData).map(country => {
    const [countryName, countryData] = country;
    return [countryName, Number(countryData[year])]
  }).sort((a, b) => b[1] - a[1]);

  return ([output[0], output.slice(1, 11)]);
}

Highcharts.getJSON('https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/us_foreign_aid.json', function(data) {
  initialData = data;

  chart = Highcharts.chart('bar_race', {
    chart: {
      animation: {
        duration: 500
      },
      events: {
        render() {
          let chart = this;

          // Responsive input
          input.style.width = chart.plotWidth - chart.legend.legendWidth + chart.plotLeft / 2 - 10 + 'px' // where 10 is a padding
        }
      },
      marginRight: 50,
    },
    plotOptions: {
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0
      }
    },
    title: {
      useHTML: true,
      text: `US Foreign AID - Disbursements: <b>${getData(startYear)[0][1]}</b>`
    },

    legend: {
      align: 'right',
      verticalAlign: 'bottom',
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '50px',
      },
      symbolHeight: 0.001,
      symbolWidth: 0.001,
      symbolRadius: 0.001,
    },
    xAxis: {
      type: 'category',
    },
    yAxis: [{
      opposite: true,
      title: {
        text: 'Amount per Sector'
      },
      tickAmount: 5
    }],
    series: [{
      colorByPoint: true,
      dataSorting: {
        enabled: true,
        matchByName: true
      },
      type: 'bar',
      dataLabels: [{
        enabled: true,
      }],
      name: startYear,
      data: getData(startYear)[1]
    }]
  });
});

/**
 * Update the chart. This happens either on updating (moving) the range input,
 * or from a timer when the timeline is playing.
 */
function update(increment) {
  if (increment) {
    input.value = parseInt(input.value) + increment;
  }
  if (input.value >= endYear) { // Auto-pause
    pause(btn);
  }

  chart.update({
    title: {
      useHTML: true,
      text: `<div>US Foreign AID - Disbursements: <b>${getData(input.value)[0][1]}</b></span></div>`
    },
  }, false, false, false)

  chart.series[0].update({
    name: input.value,
    data: getData(input.value)[1]
  })
}

/**
 * Play the timeline.
 */
function play(button) {
  button.title = 'pause';
  button.className = 'fa fa-pause';
  chart.sequenceTimer = setInterval(function() {
    update(1);
  }, 500);

}

/** 
 * Pause the timeline, either when the range is ended, or when clicking the pause button.
 * Pausing stops the timer and resets the button to play mode.
 */
function pause(button) {
  button.title = 'play';
  button.className = 'fa fa-play';
  clearTimeout(chart.sequenceTimer);
  chart.sequenceTimer = undefined;
}


btn.addEventListener('click', function() {
  if (chart.sequenceTimer) {
    pause(this)
  } else {
    play(this)
  }
})
/** 
 * Trigger the update on the range bar click.
 */
input.addEventListener('click', function() {
  update()
})