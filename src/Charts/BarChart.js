import React from "react";
import { scaleLinear,scaleBand, max } from 'd3';

export const BarChart = ({ width, height, data }) => {
  console.log(data);

  const months = [
    "Січ",
    "Лют",
    "Бер",
    "Кві",
    "Тра",
    "Чер",
    "Лип",
    "Сер",
    "Вер",
    "Жов",
    "Лис",
    "Гру"
  ];

  const margin = 10;

  const xScale = scaleBand()
  .domain(data)
    .range([width - 2 * margin, 0])
    .padding(0.2);
  
  const yScale = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .nice()
    .range([0, height - margin]);
  
  const lables = data.map((d, i) => (
    <text
      fill='white'
      textAnchor="end"
      key={i}
      x={xScale(d)+ margin * 2}
      y={yScale(d.value)- 80}
    >
      {d.value}
    </text>
  ))
  
  const gridLines = data.map((d, i) => (
    <g key={i + d.value}>
    <line
      x1={yScale(d)}
      y1={height-margin + 2}
      x2={yScale(d)}
      y2={height- margin - 2}
      stroke="gray"
      strokeWidth={2}
    >
      </line>
    
    <line
      x1={0}
      y1={height - margin}
      x2={width}
      y2={height - margin}
      stroke="gray"
    >
    </line>
    </g>
  ))
  
  const ractangles = data.map((d, index) => (
    <rect
      key={index}
      x={xScale(d)}
      y={yScale(d.value)- 100}
      height={height - margin - yScale(d.value) +100}
      width={xScale.bandwidth()}
      fill='orange'
      stroke='white'
    >
      
    </rect>
    ) 
  )

  return <svg viewBox={`0 0 ${width} ${height}`}>
    {ractangles}
    {lables}
    <g>
      <line
        x1={0}
        y1={height - margin}
        x2={0}
        y2={0}
        stroke="gray"
        strokeWidth={2}
      >
        </line>
      
      <line
        x1={0}
        y1={height - margin}
        x2={width}
        y2={height - margin}
        stroke="gray"
      >
      </line>

    </g>
    {gridLines}
  </svg>
}
