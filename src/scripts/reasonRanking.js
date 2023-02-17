import * as Plot from "@observablehq/plot";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  injuries2021,
  injuriesLaLiga2021,
  injuriesPremierLeague2021,
} from "./loadData";

function top10Reasons(data) {
  const groupByReason = Array.from(
    d3.group(data, (d) => d.reason),
    ([reason, values]) => ({ reason, values, totalInjuries: values.length })
  ).sort((a, b) => b.totalInjuries - a.totalInjuries);
  return groupByReason.splice(0, 10);
}

export const plotTopReasons = Plot.plot({
  caption: "Top 10 de lesiones más comúnes en La Liga y la Premier League 21/22",
  style: {
    backgroundColor: 'transparent'
  },
  color: {
    range: ["#009E77", "#452DFF"]
  },
  facet: {
    data: injuries2021,
    x: "league",
    label: ""
  },
  x: {
    domain: [0, 650],
  },
  marks: [
    Plot.gridX({interval: 200, stroke: "#637571"}),
    Plot.axisX({labelAnchor: "center", label: "Lesiones reportadas →"}),
    Plot.axisY({anchor: "left", label: "", tickSize: 0}),
    Plot.barX(injuries2021, Plot.groupY({x: "count"}, {y: "reason", fill: "league", sort: {y: "x", reverse: true, limit: 10}})),
  ],
  marginLeft: 100,
  marginBottom: 50,
})

export const plotTopReasonsPremierLeague = Plot.plot({
  style: {
    backgroundColor: 'transparent'
  },
  color: {
    legend: true
  },
  marks: [
    Plot.axisX({anchor: "bottom", label: "Reason"}),
    Plot.axisY({anchor: "left", label: null}),
    Plot.barX(injuriesPremierLeague2021, Plot.groupY({x: "count"}, {y: "reason", fill:"league", sort: {y: "x", reverse: true, limit: 10}})),
  ],
  marginLeft: 150,
})

export const plotTopReasonsLaLiga = Plot.plot({
  style: {
    backgroundColor: 'transparent'
  },
  color: {
    legend: true
  },
  marks: [
    Plot.axisX({anchor: "bottom", label: "Reason"}),
    Plot.axisY({anchor: "left", label: null}),
    Plot.barX(injuriesLaLiga2021, Plot.groupY({x: "count"}, {y: "reason", fill:"league", sort: {y: "x", reverse: true, limit: 10}})),
  ],
  marginLeft: 150,
})