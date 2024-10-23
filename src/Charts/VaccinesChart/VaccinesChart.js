import React, { useEffect, useRef } from "react";
import { select, scaleBand, axisBottom } from "d3";
import * as d3 from "d3";
import { DrawVaccinesChart } from "./DrawVaccinesChart";

export const VaccinesChart = ({
  width,
  height,
  data,
  activeVaccine,
  selectedVaccine,
  newVaccine,
  birth,
  HandleGraph,
  activeBatton,
  handleVaccineclick
}) => {

  const margin = 22;
  const targeVaccine = activeVaccine;
  const updatedVaccine = newVaccine;

  const xAxisRef = useRef(null);
  const rectRef = useRef();

  const xScale = scaleBand()
    .domain(data.map((d) => d.month))
    .range([0, width])
    .padding(0.4);

  useEffect(() => {
    const SVG = select(rectRef.current);
    DrawVaccinesChart(
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
      activeBatton,
      handleVaccineclick
    );

    const xAxis = axisBottom(xScale).tickFormat((month) => month.slice(0, 3));

    if (xAxisRef.current) {
      d3.select(xAxisRef.current).call(xAxis);
    }
  }, [data, 
      handleVaccineclick, 
      targeVaccine, 
      xScale, 
      width, 
      height, 
      birth, 
      HandleGraph,
      updatedVaccine,
      activeBatton,
      selectedVaccine
    ]);

  return (
    <svg ref={rectRef} viewBox={`0 0 ${width} ${height}`}>
    </svg>
  );
};
