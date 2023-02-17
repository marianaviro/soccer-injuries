import * as Plot from "@observablehq/plot";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { injuries2021 } from "./loadData";

const minDate = new Date("08/19/2021");
const maxDate = new Date("05/23/2022");

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const dates = [];
  while (date <= endDate) {
    const obj = new Date(date);
    dates.push(obj.toDateString());
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

console.log(injuries2021);

const series = Array.from(
  d3.flatRollup(
    injuries2021,
    (v) => v.length,
    (d) => {
      const obj = new Date(d.date);
      return obj.toDateString();
    },
    (d) => d.league
  ),
  ([date, league, count]) => ({ date, league, count })
);

console.log(series);

const allDates = [];

getDatesInRange(minDate, maxDate).forEach((date) => {
  const injuryLL = series.find(
    (i) => i.date === date && i.league === "La Liga"
  );
  const injuryPL = series.find(
    (i) => i.date === date && i.league === "Premier League"
  );
  const objLL = {
    ...injuryLL,
    date: injuryLL ? injuryLL.date : date,
    count: injuryLL ? injuryLL.count : 0,
    league: "La Liga",
  };
  const objPL = {
    ...injuryPL,
    date: injuryPL ? injuryPL.date : date,
    count: injuryPL ? injuryPL.count : 0,
    league: "Premier League",
  };
  allDates.push(objLL);
  allDates.push(objPL);
});

console.log(allDates);

export const plotDates = Plot.plot({
  height: 500,
  marginBottom: 100,
  x: { round: true, nice: d3.utcWeek },
  y: {
    tick: true,
    label: "↑ Daily trade volume (millions)",
  },
  facet: {
    data: allDates,
    y: "league",
  },
  marks: [
    Plot.lineY(allDates, {
      x: "date",
      y: "count",
      stroke: "league",
      mixBlendMode: "multiply",
      sort: "date",
    }),
    Plot.axisX({
        ticks: "date",
      tickSize: 28,
      tickPadding: -11,
      tickFormat: (d) => {
        const obj = new Date(d.date)
        return obj.getUTCFullYear()
      },
      textAnchor: "start",
    }),
    Plot.axisX({
        ticks: "date",
      tickSize: 16,
      tickPadding: -11,
      tickFormat: (d) => {
        const obj = new Date(d.date)
        return obj.getUTCMonth()
      },
      textAnchor: "start",
    }),
    Plot.ruleY([0]),
  ],
});
