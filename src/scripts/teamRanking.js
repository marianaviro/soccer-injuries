import * as Plot from "@observablehq/plot";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  injuries2021,
  injuriesLaLiga2021,
  injuriesPremierLeague2021,
} from "./loadData";

function top10Teams(data) {
  const groupByTeam = Array.from(
    d3.group(data, (d) => d.team),
    ([team, values]) => ({ team, values, totalInjuries: values.length })
  ).sort((a, b) => b.totalInjuries - a.totalInjuries);
  return groupByTeam.splice(0, 10);
}

export const plotTopTeams = Plot.plot({
  caption: "Top 10 de equipos con más lesiones en La Liga y la Premier League 21/22",
  marginLeft: 50,
  style: {
    backgroundColor: "transparent",
  },
  y: {
    domain: [0, 250]
  },
  color: {
    legend: true,
    range: ["#009E77", "#452DFF"]
  },
  marks: [
    Plot.gridY({interval: 20, stroke: "#637571"}),
    Plot.barY(top10Teams(injuries2021), {
      x: "team",
      y: "totalInjuries",
      sort: { x: "y", reverse: true, limit: 10 },
      fill: (d) => (d.values[0].league),
    }),
    Plot.text(top10Teams(injuries2021), {
      x: "team",
      y: "totalInjuries",
      text: (d) => d.totalInjuries,
      dy: -12,
    }),
    Plot.axisX({ anchor: "bottom", lineWidth: 2, tickSize: 0, label: "" }),
    Plot.axisY({ labelAnchor: "center", label: "Ausencias por lesiones →", tickSize: 0}),
  ],
});

export const plotTopTeamsPremierLeague = Plot.plot({
  style: {
    backgroundColor: "transparent",
  },
  marginBottom: 100,
  color: {
    round: true,
    legend: true,
  },
  marks: [
    Plot.barY(top10Teams(injuriesPremierLeague2021), {
      x: "team",
      y: "totalInjuries",
      sort: { x: "y", reverse: true, limit: 10 },
      fill: (d) => d.values[0].league,
    }),
    Plot.axisX({ anchor: "bottom", lineWidth: 2, tickSize: 0 }),
    Plot.ruleY([0]),
  ],
});

export const plotTopTeamsLaLiga = Plot.plot({
  style: {
    backgroundColor: "transparent",
  },
  color: {
    legend: true,
  },
  marks: [
    Plot.barY(top10Teams(injuriesLaLiga2021), {
      x: "team",
      y: "totalInjuries",
      sort: { x: "y", reverse: true, limit: 10 },
      fill: (d) => d.values[0].league,
    }),
    Plot.text(top10Teams(injuriesLaLiga2021), {
      x: "team",
      y: "totalInjuries",
      text: (d) => d.totalInjuries,
      dy: -10,
    }),
    Plot.axisX({ anchor: "bottom", lineWidth: 2, tickSize: 0, label: "" }),
    Plot.ruleY([0]),
  ],
});
