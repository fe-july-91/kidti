import React from "react";
import { scaleLinear,scaleBand, max } from 'd3';

export const BarChart2 = ({ width, height, data }) => {
  console.log(data);
  
  const margin = 10;
  const xScale = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .range([0, width - margin]);
  
  const yScale = scaleBand()
    .domain(data)
    .range([0, height - 2 * margin]);
  
  const lables = data.map((d, index) => (
    <text
      fill='white'
      textAnchor="end"
      key={index}
      x={xScale(d.value)}
      y={yScale(d)+ margin * 2}
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
      x={margin}
      y={yScale(d)}
      height={yScale.bandwidth()}
      width={xScale(d.value)}
      fill='#C88CF8'
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
