var option = "";
var dataSet ;


function init() {

  d3.json("https://raw.githubusercontent.com/mirfakhrulhassan/Interactive-Dashboard-Plot.ly-JavaScript/master/samples.json").then(function(data){
    dataSet = data;

    console.log(dataSet);
    
    displayMetaData(940,dataSet);
    displayHBarChart(940,dataSet);
    displayBubbleChart(940,dataSet);

    var optionMenu = d3.select("#selDataset");

    data.names.forEach(function(name){
      optionMenu.append("option").text(name);
    });
 })
}

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function optionChanged(value) {
    option = value;
    displayMetaData(option,dataSet);
    displayHBarChart(option,dataSet);
    displayBubbleChart(option,dataSet);
}

function displayMetaData(option,dataSet) {
    
    
    var mtdata = dataSet.metadata.filter(row => row.id == option);
    d3.select("#sample-metadata").html(displayObject(mtdata[0]));
        
}

function displayObject(obj) {
    var str = "";
    Object.entries(obj).forEach(([key,value]) => {
        str += `<br>${key}:${value}</br>`;
        if(key=="wfreq"){
            buildGauge(value);
            console.log("gauge value is:" +value);
        }
        
    });
    return str;
}

function displayHBarChart(option,dataSet) {
    
    var barData = dataSet.samples.filter(sample => sample.id == option);
    console.log(barData);
    

    

    var y = barData.map(row =>row.otu_ids);  
    var y1 =[];

    
   
    for(i=0;i<y[0].length;i++){
        y1.push(`OTU ${y[0][i]}`);
    }

    var x = barData.map(row =>(row.sample_values));
    var text = barData.map(row =>row.otu_labels);
    

    var trace = {
        x:x[0].slice(0,10),
        y:y1.slice(0,10),
        text:text[0].slice(0,10),
        type:"bar",
        orientation:"h",
        
    };

    var data = [trace];

    var layout = {
        yaxis: {
            autorange: "reversed" 
        }
    }

    

    
    Plotly.newPlot("bar",data,layout);
}

function displayBubbleChart(option,dataSet) {

    var barData = dataSet.samples.filter(sample => sample.id == option);
    console.log(barData); 

    var x = barData.map(row =>row.otu_ids); 
    var y = barData.map(row =>row.sample_values); 
    var text = barData.map(row =>row.otu_labels);
    var marker_size = barData.map(row =>row.sample_values);
    var marker_color = barData.map(row =>row.otu_ids);
    
    console.log(x[0]);
    console.log(y[0]);
    console.log(text);
    
    var trace1 = {
        x:x[0],
        y:y[0],
        text: text[0],
        mode:"markers",
        marker: {
            color: marker_color[0],
            size: marker_size[0]
        }
        
    };

    var data = [trace1];

    var layout = {
        xaxis:{
            title: "OTU ID"
        }

    };

    Plotly.newPlot("bubble",data,layout);

}



init();