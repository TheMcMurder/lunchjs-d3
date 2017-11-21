var height = 800,
  width = 800;

var margin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

var chartHeight = height - margin.top - margin.bottom,
  chartWidth = width - margin.left - margin.right,
  chartX = margin.left,
  chartY = margin.top,
  barMarginPercent = 0.1;

var data = [
  {'title': 'A', value: 100},
  {'title': 'B', value: 200},
  {'title': 'C', value: 300},
  {'title': 'D', value: 100},
  {'title': 'E', value: 200},
  {'title': 'F', value: 500}
];

var svg = d3.select('.mySvgContainer')
  .append('svg')
  .attr('height', height)
  .attr('width', width);

var barChart = svg.append('g')
  .attr('id', 'barChart')
  .attr('transform', 'translate(' + chartX + ',' + chartY + ')');

var yScale = d3.scale.ordinal()
  .domain(data.map(function(d){
    return d.title;
  }))
  .rangeRoundBands([0, chartHeight], barMarginPercent);

var maxValue = d3.max(data, function(d){
  return d.value;
});

var xScale = d3.scale.linear()
  .domain([0, maxValue])
  .range([0, chartWidth]);

var allBars = barChart.selectAll('rect.myBar')
  .data(data);

allBars.enter()
  .append('rect')
  .classed('myBar', true)
  .attr({
    x: 0,
    y: function (d, i) {
      return yScale(d.title);
    },
    height: yScale.rangeBand(),
    width: 0 // NEW CODE
  })
  .style('fill', 'steelblue')
  .transition()
  .duration(500)
  .delay(function(d,i){
    return i * 50;
  })
  .attr("width", function(d){
    return xScale(d.value);
  });

allBars.on("mouseover", function(){
  d3.select(this)
    .transition()
    .style("fill", "#FF9C5B");
}).on("mouseout", function(){
  d3.select(this)
    .transition()
    .style("fill", "steelblue");
});

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom');

var xAxisGroup = svg.append('g')
  .attr('class', 'x axisGroup')
  .attr('transform', 'translate(' + chartX + ',' + (chartY + chartHeight) + ')')
  .call(xAxis);

xAxisGroup.selectAll('path, line')
  .style('fill', 'none')
  .style('stroke', 'black');

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left');

var yAxisGroup = svg.append('g')
  .attr('class', 'y axisGroup')
  .attr('transform', 'translate(' + chartX + ',' + chartY + ')')
  .call(yAxis);

yAxisGroup.selectAll('path, line')
  .style('fill', 'none')
  .style('stroke', 'black');