import * as Plot from "@observablehq/plot";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  injuries2021,
  injuriesPremierLeague2021,
  injuriesLaLiga2021,
} from "./loadData";

function top10Fixtures(data) {
  const groupByFixture = Array.from(
    d3.group(data, (d) => d.fixtureId),
    ([fixtureId, values]) => ({
      fixtureId,
      fixtureName: values[0].fixtureName,
      league: values[0].league,
      leagueId: values[0].leagueId,
      values,
      totalInjuries: values.length,
    })
  ).sort((a, b) => b.totalInjuries - a.totalInjuries);
  return groupByFixture.splice(0, 10);
}

export const plotTopFixtures = Plot.plot({
  style: {
    backgroundColor: "transparent",
  },
  color: {
    legend: true,
  },
  marks: [
    Plot.axisX({ anchor: "bottom", label: "Reason" }),
    Plot.axisY({ anchor: "left", label: null }),
    Plot.barX(
      injuries2021,
      Plot.groupY(
        { x: "count" },
        {
          y: "fixtureName",
          fill: "league",
          sort: { y: "x", reverse: true, limit: 10 },
        }
      )
    ),
  ],
  marginLeft: 250,
});

export const plotTopFixturesPremierLeague = Plot.plot({
  height: 480,
  marginLeft: 200,
  marginBottom: 50,
  caption: "Top 10 de partidos con más ausencias por lesiones en la Premier League 21/22",
  style: {
    backgroundColor: "transparent",
  },
  x: {
    domain: [0, 20],
  },
  marks: [
    Plot.barX(top10Fixtures(injuriesPremierLeague2021), {
      y: "fixtureName",
      x: "totalInjuries",
      sort: { y: "x", reverse: true },
      fill: "#452DFF",
    }),
    Plot.axisX({labelAnchor: "center", label: "Lesiones reportadas →"}),
    Plot.axisY({anchor: "left", label: "", tickSize: 0, lineWidth: 12}),
    Plot.gridX({ interval: 5, stroke: "#fff", strokeOpacity: 1 }),
    Plot.gridX({ interval: 5, stroke: "#637571"}),
  ],
});

export const plotTopFixturesLaLiga = Plot.plot({
  height: 480,
  marginLeft: 200,
  marginBottom: 50,
  caption: "Top 10 de partidos con más ausencias por lesiones en La Liga 21/22",
  style: {
    backgroundColor: "transparent",
  },
  marks: [
    Plot.barX(top10Fixtures(injuriesLaLiga2021), {
      y: "fixtureName",
      x: "totalInjuries",
      sort: { y: "x", reverse: true },
      fill: "#009E77",
    }),
    Plot.axisX({labelAnchor: "center", label: "Lesiones reportadas →"}),
    Plot.axisY({anchor: "left", label: "", tickSize: 0, lineWidth: 12}),
    Plot.gridX({ interval: 5, stroke: "#fff", strokeOpacity: 1 }),
    Plot.gridX({ interval: 5, stroke: "#637571"}),
  ],
});
