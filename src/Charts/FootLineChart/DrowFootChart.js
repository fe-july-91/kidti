import { scaleLinear, scaleBand, axisBottom, axisLeft, line, extent, max, min } from 'd3';
import * as d3 from "d3";

export function DrowFootChart(
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
  .domain(data.map(d => d.month))
  .range([margin, width])
  .padding(0.4);

  const values = data.map(d => d.value);

// Настройка шкалы Y
const yScale = scaleLinear()
  .domain(extent([min(values.filter(v => v > 0)) - 5, max(data, d => d.value) + 1]))
  .range([height - margin, margin * 2]);

  const filteredData = data.filter(d => d.value > 0);
  const currentData = data.find(d => d.month === targetMonth);

// Генератор линии
const lineGenerator = line()
  .x(d => xScale(d.month) + xScale.bandwidth() / 2) // Используем xScale для размещения линии
  .y(d => yScale(d.value))
  .curve(d3.curveLinear); // Опционально: тип кривой для сглаживания

// Удаляем старые элементы
SVG.selectAll('.line').remove();
SVG.selectAll('.point').remove();

// Добавляем линию
SVG.append('path')
  .datum(filteredData)
  .attr('class', 'line')
  .attr('d', lineGenerator)
  .attr('fill', 'none')
  .attr('stroke', '#50C3F9') // Цвет линии
  .attr('stroke-width', 2); // Ширина линии

// Добавляем метки
const labels = SVG.selectAll('.label')
  .data(filteredData);

labels.enter()
  .append('text')
  .attr('class', 'label')
  .attr('x', d => xScale(d.month) + xScale.bandwidth() / 2)
  .attr('y', d => yScale(d.value) - 12)
  .attr('text-anchor', 'middle')
  .attr('fill', d =>
    d.month === targetMonth
      ? '#FF5C9D'
      : '#625F6C'
  )
  .text(d => d.value);

labels
  .transition()
  .duration(500)
  .attr('x', d => xScale(d.month) + xScale.bandwidth() / 2) // Центрируем метку по x
  .attr('y', d => yScale(d.value) - 12) // Размещаем над точками
  .attr('fill', d =>
    d.month === targetMonth
      ? '#FF5C9D'
      : '#625F6C'
  )
  .text(d => d.value);

  labels.exit().remove();
  
  // Добавляем вертикальные линии
const lines = SVG.selectAll('.line')
.data(data);

lines.enter()
.append('line')
.attr('class', 'line')
.attr('x1', d => xScale(d.month) + xScale.bandwidth() / 2) 
.attr('y1', d => yScale(d.value)) 
.attr('x2', d => xScale(d.month) + xScale.bandwidth() / 2) 
.attr('y2', height - margin/2) 
.attr('stroke', '#cccccc') 
.attr('stroke-dasharray', '4,4') 
.attr('stroke-width', 1); 

lines
.transition()
.duration(500)
.attr('x1', d => xScale(d.month) + xScale.bandwidth() / 2)
.attr('y1', d => yScale(d.value))
.attr('x2', d => xScale(d.month) + xScale.bandwidth() / 2)
.attr('y2', height - margin/2);

lines.exit().remove();

// Добавляем точки
const points = SVG.selectAll('.point')
  .data(filteredData);

points.enter()
  .append('circle')
  .attr('class', 'point')
  .attr('cx', d => xScale(d.month) + xScale.bandwidth() / 2)
  .attr('cy', d => yScale(d.value))
  .attr('r', 8)
  .attr('fill', d =>
    d.month === targetMonth
      ? '#FF5C9D'
      : '#50C3F9'
  )
  .style('cursor', 'pointer')
  .on('click', (event, d) => {
    HandleGraph(d);
  });

points
  .transition()
  .duration(500)
  .attr('cx', d => xScale(d.month) + xScale.bandwidth() / 2)
  .attr('cy', d =>
    slider > 0 && d.month === targetMonth
      ? yScale(slider)
      : yScale(d.value)
  )
  .attr('r', 8) // Радиус точки
  .attr('fill', d =>
    d.month === targetMonth
      ? '#FF5C9D'
      : '#50C3F9'
  );

points.exit().remove();

// Добавляем ось X
SVG.selectAll('.x-axis').remove();
const xAxisGroup = SVG.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0,${height - margin})`)
  .call(axisBottom(xScale).tickFormat(d => d.slice(0, 3)))
  .selectAll('text') 
  .style('font-size', '12px')
  .style('cursor', 'pointer');

  xAxisGroup
    .style('fill', d => d === targetMonth ? '#FF5C9D' : '#625F6C')
    .on('click', (event, d) => {
      HandleGraph({ month: d, value: data.find(item => item.month === d).value });
    });

// Добавляем ось Y
SVG.selectAll('.y-axis').remove();
const yAxisGroup = SVG.append('g')
  .attr('class', 'y-axis')
  .attr('transform', `translate(${margin + 2}, 0)`)
  .call(axisLeft(yScale))

  // yAxisGroup.select('.domain').remove();

  yAxisGroup.selectAll('.tick line')
  .style('stroke', '#625F6C') // Цвет линий разметки
  .style('stroke-width', '1px'); // Ширина линий разметки


  yAxisGroup.selectAll('text') 
  .style('font-size', '12px')
  .style('fill', d => d === currentData.value ? '#FF5C9D' : '#625F6C') 
}
