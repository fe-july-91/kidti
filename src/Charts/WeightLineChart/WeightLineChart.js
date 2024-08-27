import React, { useEffect, useRef } from "react";
import { select } from "d3";
import { DrowLineChart } from "./DrowLineChart";

export const WeightLineChart = ({
  width,
  height,
  data,
  selectedMonth,
  slider,
  HandleGraph,
}) => {

  const margin = 20;
  const targetMonth = selectedMonth;

  const rectRef = useRef();

  useEffect(() => {
    const SVG = select(rectRef.current);
    DrowLineChart(
      SVG,
      data,
      height,
      width,
      margin,
      targetMonth,
      slider,
      HandleGraph
    );
  }, [data, targetMonth, width, height, slider, HandleGraph]);

  return (
    <svg ref={rectRef} viewBox={`0 0 ${width} ${height}`}>
    </svg>
  );
};
