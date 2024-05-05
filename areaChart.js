import * as d3 from "d3";

export function renderAreaChart(data) {
  const values = [
    { PercentChange: data.changePct, Current: data.current },
    { PercentChange: 0, Current: data.oneYearAgo }
  ];

  let svg = d3
    .select(".container")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  const x = d3
    .scaleLinear()
    .domain(d3.extent(values, (d) => d.PercentChange))
    .range([0, 500]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(values, (d) => d.Current))
    .range([500, 0]);

  svg
    .append("path")
    .datum(values)
    .attr("fill", "none")
    .attr("stroke", "#ff0000")
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .area()
        .x((d) => x(d.PercentChange))
        .y0(y(0))
        .y1((d) => y(d.Current))
    );

  svg
    .append("g")
    .attr("transform", "translate(0, 500)")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
  console.log("doNE")
}