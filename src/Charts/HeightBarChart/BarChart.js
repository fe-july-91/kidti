import React, { useEffect, useRef } from "react";
import { select } from 'd3';
import { DrawChart } from "./DrowChart";

export const BarChart = ({
  width,
  height,
  data,
  selectedMonth,
  slider,
  HandleGraph
}) => {

  const margin = 20;

  const rectRef = useRef();

  useEffect(() => {
    const SVG = select(rectRef.current)
    DrawChart(
      SVG,
      data,
      height,
      width,
      margin,
      selectedMonth,
      slider,
      HandleGraph)
  }, [ data, selectedMonth, width, height, slider, HandleGraph]);

  return <svg ref={rectRef} viewBox={`0 0 ${width} ${height}`}>
    </svg>
}
