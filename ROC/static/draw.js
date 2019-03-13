// reference -- http://bl.ocks.org/d3noob/7030f35b72de721622b8
var margin = {top: 50, right: 50, bottom: 70, left: 70},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// random choice line
var line_45 = [{"x":+0, "y":+0}, {"x":+1, "y":+1}];

var svg = d3.select("#ROC")
  .attr("height", height)
  .attr("width", width);

// scale and axis
var xScale = d3.scaleLinear().domain([0, 1]).range([margin.left, width - margin.right]);
var yScale = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);
var line45plotter = d3.line()
  .x(function(d) { return xScale(d.x); })
  .y(function(d) { return yScale(d.y); });

var xAxis = svg.append("g")
  .attr("transform", `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom().scale(xScale));

var yAxis = svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft().scale(yScale));

// add reference line
svg.append("g")
  .append("path")
  .attr("d", line45plotter(line_45))
  .attr("class", "line45")
  .style("stroke-dasharray", ("3, 3"));

// x label
svg.append("text")
  .attr("transform", "rotate(-90)").attr("y", 20)
  .attr("x", -height/2).attr("dy", "lem")
  .style("text-anchor", "middle").text("True Positive Rate");

// y label
svg.append("text")
  .attr("x", width/2)
  .attr("y", height - 20)
  .style("text-anchor", "middle")
  .text("False Positive Rate");

var lineROC = d3.line()
  .x(function(d) { return xScale(d.fpr); } )
  .y(function(d) { return yScale(d.tpr); } );

function drawROC(url){

  d3.json(url)
    .then(function(roc_vals) {

    // remove old line
    d3.selectAll(".lineROC").remove();
    
    // plot new line
    svg.append("g")
      .append("path")
      .attr("d", lineROC(roc_vals))
      .attr("class", "lineROC");

  });

}
