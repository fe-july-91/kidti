import { scaleBand, axisBottom, axisLeft, scalePoint } from 'd3';

import { vaccinTypes } from '../../Utils/kit';
import { getAgeAtVaccination } from '../../Shared/hendlers/VactinationAge';
import { parseDate } from '../../Shared/hendlers/parseDate';

export function DrawVaccinesChart(
  SVG,
  data,
  height,
  width,
  margin,
  targeVaccine,
  selectedVaccine,
  updatedVaccine,
  birth,
  HandleGraph,
  activeBatton
) {

  const marginLeft = margin + 145;
  const marginGrahp = margin;

  let age = "";

  if (targeVaccine) {
    age = getAgeAtVaccination(targeVaccine.date,birth)
  }

  console.log(vaccinTypes)

  // Создаем массив уникальных комбинаций (дата, месяц, год)
  const xData = data.map(d => d.date);
  const uniqueXData = [...new Set(xData)]
    .sort((a, b) => parseDate(a).getTime() - parseDate(b).getTime());
  
  const newVaccine = (d) => {
    return updatedVaccine && d.type === updatedVaccine.type && d.date === updatedVaccine.date
  }
    
  // Настраиваем шкалу X
  const xScale = scalePoint()
    .domain(uniqueXData)
    .range([marginLeft, width])
    .padding(0.5);
  
    // Настройка шкалы Y
    const yScale = scaleBand()
    .domain(vaccinTypes)
    .range([height - marginGrahp, margin])
    .padding(0.4);
  
    // Создаем шкалу X для возраста
    const ageScale = scalePoint()
    .domain(uniqueXData.map(d => getAgeAtVaccination(d,birth)))
    .range([marginLeft, width])
      .padding(0.4);
  
  
  // Добавляем верхнюю ось X для возраста
  SVG.selectAll('.age-axis').remove();

  const ageAxisGroup = SVG.append('g')
    .attr('class', 'age-axis')
    .attr('transform', `translate(0, ${0})`) // Поднятие оси вверх
    .call(axisBottom(ageScale));
  
  ageAxisGroup.selectAll('path').remove();// удаляет линию оси.
  ageAxisGroup.selectAll('line').remove(); // Удаляет линии оси

    ageAxisGroup.selectAll('text')
      .style('font-size', '16px')
      .style('fill',a => age && a === age ? '#FF5C9D' : '#C88CF8')
    .style('text-anchor', 'middle')
  
// Добавляем вертикальные пунктирные линии
SVG.selectAll('.age-lines').remove();
SVG.append('g')
  .attr('class', 'age-lines')
  .selectAll('line')
  .data(data)
  .enter()
  .append('line')
  .attr('x1',  d => xScale(d.date)) // Начало от оси Y
  .attr('x2', d => xScale(d.date)) // Заканчивается на точке по оси X
  .attr('y1', marginGrahp + 15) // Начинаем от верхней границы графика
  .attr('y2', height - marginGrahp) // Заканчиваем на уровне нижней оси X
  .style('stroke', d => targeVaccine && d.date === targeVaccine.date ? '#FF5C9D': '#a6aeb7')
  .style('stroke-width', '1px')
  .style('stroke-dasharray', '4 4');

// Добавляем горизонтальные пунктирные линии
SVG.selectAll('.horizontal-lines').remove();
SVG.append('g')
  .attr('class', 'horizontal-lines')
  .selectAll('line')
  .data(vaccinTypes)
  .enter()
  .append('line')
  .attr('x1', marginLeft) // Начало на оси Y
  .attr('x2', width) // Конец на правом краю графика
  .attr('y1', d => yScale(d) + yScale.bandwidth() / 2) // Центр по Y для каждого типа вакцины
  .attr('y2', d => yScale(d) + yScale.bandwidth() / 2) // Центр по Y для каждого типа вакцины
  .style('stroke', d => targeVaccine && d === targeVaccine.type ? '#FF5C9D': '#a6aeb7')
  .style('stroke-width', '1.5px')
  .style('stroke-dasharray', '4 4');
  
// Добавляем ось X
SVG.selectAll('.x-axis').remove();
const xAxisGroup = SVG.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0,${height - marginGrahp})`)
  .call(axisBottom(xScale).tickFormat(d => d.slice(0, 6) + d.slice(8)))
  .selectAll('text') 
  .style('font-size', '12px')
  .style('text-anchor', 'middle')
  .style('cursor', 'pointer');

  // Добавляем ось Y с текстовыми метками типа вакцин
  SVG.selectAll('.y-axis').remove();
  const yAxisGroup = SVG.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${marginLeft}, 0)`)
    .call(axisLeft(yScale)) // Используем шкалу yScale для оси Y
    .selectAll('text')
    .style('font-size', '16px')
    .style('letter-spacing', '-0.5px')
    .style('fill', d => d === selectedVaccine & activeBatton ? '#FF5C9D' :'#42456C')
    .style('font-weight', '400')
    .style('text-rendering', 'optimizeLegibility');

  yAxisGroup.selectAll('.tick line')
    .style('stroke', '#625F6C')
    .style('stroke-width', '1px');

    // SVG.selectAll().remove()

 // Remove old points and labels
 SVG.selectAll('.point').remove();
 SVG.selectAll('.point-label').remove();

// Добавляем новые точки
const points = SVG.selectAll('.point')
  .data(data, d => d.date + d.type );

// Enter new points
points.enter()
  .append('circle')
  .attr('class', 'point')
  .attr('cx', d => xScale(d.date))
  .attr('cy', d => yScale(d.type) + yScale.bandwidth() / 2)
  .attr('r', d => newVaccine(d) ? 0 : 16 ) // Start with a radius of 0 for the animation
  .attr('fill', d => d === targeVaccine ? '#FF5C9D' : '#C88CF8')
  .style('cursor', 'pointer')
  .on('click', (event, d) => {
    HandleGraph(d);
  })
  .transition()
  .duration(600)
  .attr('r', 16) // Start with a radius of 0 for the animation

// Update existing points
points.transition()
  .duration(600)
  .attr('cx', d => xScale(d.date))
  .attr('cy', d => yScale(d.type) + yScale.bandwidth() / 2)
  .attr('fill', d => d === targeVaccine ? '#FF5C9D' : '#C88CF8')

// Remove exiting points
points.exit()
  .transition()
  .duration(600)
  .attr('r', 0 ) // Start with a radius of 0 for the animation
  .remove();


const labels = SVG.selectAll('.point-label')
.data(data, d => d.type + d.date); // Key function to uniquely identify

// Enter new labels
labels.enter()
.append('text')
.attr('class', 'point-label')
.attr('x', d => xScale(d.date))
.attr('y', d => yScale(d.type) + yScale.bandwidth() / 2)
.attr('dy', '.35em')
.attr('text-anchor', 'middle')
.style('fill', '#fff')
.style('font-size', '14px')
.style('cursor', 'pointer')
.style('user-select', 'none') // Remove text cursor
.text(d => d.orderNumber)
  .style('opacity', 1)
  .on('click', (event, d) => {
    HandleGraph(d);
  })

// Update existing labels
labels.transition()
.duration(600)
.attr('x', d => xScale(d.date))
.attr('y', d => yScale(d.type) + yScale.bandwidth() / 2)
.text(d => d.orderNumber);

// Remove exiting labels
labels.exit()
.transition()
.duration(600)
.style('opacity', 0) // Animate to opacity 0 before removing
.remove();
}