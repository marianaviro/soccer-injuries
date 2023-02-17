import * as Plot from "@observablehq/plot";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  injuries2021,
  injuriesLaLiga2021,
  injuriesPremierLeague2021,
} from "./loadData";

function top10Reasons(data) {
  const groupByPlayer = Array.from(
    d3.group(data, (d) => d.player),
    ([player, values]) => ({ player, values, totalInjuries: values.length })
  ).sort((a, b) => b.totalInjuries - a.totalInjuries);
  return groupByPlayer.splice(0, 10);
}

export const plotTopPlayers = Plot.plot({
  style: {
    backgroundColor: 'transparent'
  },
  color: {
    legend: true
  },
  facet: {
    data: injuries2021,
    x: "league"
  },
  marks: [
    Plot.axisX({anchor: "bottom", label: "Player"}),
    Plot.axisY({anchor: "left", label: null}),
    Plot.barX(injuries2021, Plot.groupY({x: "count"}, {y: "player", fill:"league", sort: {y: "x", reverse: true, limit: 10}})),
  ],
  marginLeft: 150,
})

export const plotTopPlayersPremierLeague = Plot.plot({
  style: {
    backgroundColor: 'transparent'
  },
  color: {
    legend: true
  },
  marks: [
    Plot.axisX({anchor: "bottom", label: "Reason"}),
    Plot.axisY({anchor: "left", label: null}),
    Plot.barX(injuriesPremierLeague2021, Plot.groupY({x: "count"}, {y: "player", fill:"league", sort: {y: "x", reverse: true, limit: 10}})),
  ],
  marginLeft: 150,
})

export const plotTopPlayersLaLiga = Plot.plot({
  style: {
    backgroundColor: 'transparent'
  },
  color: {
    legend: true
  },
  marks: [
    Plot.axisX({anchor: "bottom", label: "Reason"}),
    Plot.axisY({anchor: "left", label: null}),
    Plot.barX(injuriesLaLiga2021, Plot.groupY({x: "count"}, {y: "player", fill:"league", sort: {y: "x", reverse: true, limit: 10}})),
  ],
  marginLeft: 150,
})