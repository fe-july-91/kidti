import { scaleLinear,scaleBand, max, extent,axisBottom, line} from 'd3';
import * as d3 from "d3";

export function DrawChart(
  SVG,
  data,
  height,
  width,
  margin,
  targetMonth,
  slider,
  HandleGraph
) {

  const xScale = scaleBand()
  .domain(data.map((d) => d.month))
  .range([0, width - margin])
  .padding(0.4);
  
  const yScale = scaleLinear()
    .domain(extent([0, max(data, d => d.value) + 3]))
    .nice()
    .range([height - margin, margin * 2]);
  
  const filteredData = data.filter(d => d.value > 0);
  
  SVG.selectAll('.bar').remove();

 // Create bars
 const bars = SVG.selectAll('.bar')
   .data(data);

// Enter
bars.enter()
 .append('rect')
 .attr('class', 'bar')
 .attr('x', d => xScale(d.month))
 .attr('y', d => yScale(d.value))
 .attr('width', xScale.bandwidth())
 .attr('height', d => height - margin - yScale(d.value))
 .attr('fill', d =>
   d.month === targetMonth
     ? '#FF5C9D'
     : '#50C3F9'
 )
 .attr('rx', '10')
  .attr('ry', '10')
  .style('cursor', 'pointer')
  .on('click', (event, d) => {
    HandleGraph(d);
  });

// Update
  bars
    .transition()
    .duration(500)
    .attr('x', d => xScale(d.month))
    .attr('y', d =>
      slider > 0 && d.month === targetMonth
        ? yScale(slider)
        : yScale(d.value)
    )
    .attr('width', xScale.bandwidth())
    .attr('height', d =>
      slider > 0 && d.month === targetMonth
        ? height - margin - yScale(slider)
        : height - margin - yScale(d.value)
    )
    .attr('fill', d =>
      d.month === targetMonth
        ? '#FF5C9D'
        : '#50C3F9'
    )
    .attr('rx', '10')
    .attr('ry', '10');

// Exit
  bars.exit().remove();
  
  // Add labels
  const labels = SVG.selectAll('.label')
    .data(filteredData);

  // Enter
  labels.enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => xScale(d.month) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.value) - 5)  // Adjust vertical position
    .attr('text-anchor', 'middle')
    .attr('fill', d =>
      d.month.toLowerCase() === targetMonth.toLowerCase()
        ? '#FF5C9D'
        : '#625F6C'
    )
    .text(d =>
      slider > 0 && d.month === targetMonth
        ? slider
        : d.value);

  // Update
  labels
    .transition()
    .duration(500)
    .attr('x', d => xScale(d.month) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.value) - 5)  // Adjust vertical position
    .attr('fill', d =>
      d.month.toLowerCase() === targetMonth.toLowerCase()
        ? '#FF5C9D'
        : '#625F6C'
    )
    .text(d =>
      slider > 0 && d.month === targetMonth
        ? slider
        : d.value);

  // Exit
  labels.exit().remove();

    // Add line


  const lineGenerator = line()
  .x(d => xScale(d.month) + xScale.bandwidth() / 2)
  .y(d => yScale(d.value))
  .curve(d3.curveLinear); // Optional: curve type for smoothness

const filteredDataForLine = data.filter(d => d.value > 0);


SVG.selectAll('.line').remove(); // Remove existing line if any

SVG.append('path')
  .datum(filteredDataForLine)
  .attr('class', 'line')
  .attr('d', lineGenerator)
  .attr('fill', 'none')
  .attr('stroke', '#50C3F9') // Line color
    .attr('stroke-width', 2) // Line width
    .style('stroke-dasharray', '4 4');

  
  // Добавляем ось X
SVG.selectAll('.x-axis').remove();
const xAxisGroup = SVG.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0,${height - margin})`)
  .call(axisBottom(xScale).tickFormat(d => d.slice(0, 3)))
  .selectAll('text') 
  .style('font-size', '12px')
  .style('cursor', 'pointer')  // Добавляем стиль курсора для указания интерактивности
  
  xAxisGroup
    .style('fill', d => d === targetMonth ? '#FF5C9D' : '#625F6C')
    .on('click', (event, d) => {
      HandleGraph({ month: d, value: data.find(item => item.month === d).value });
    });

}