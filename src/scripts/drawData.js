import { plotTopFixturesPremierLeague, plotTopFixturesLaLiga } from "./fixtureRanking";
import { plotTopTeams } from "./teamRanking";
import { plotTopReasons } from "./reasonRanking";

export function draw(plot, div) {
    document.getElementById(div).append(plot);
  }

draw(plotTopTeams, 1);
draw(plotTopReasons, 2);
draw(plotTopFixturesPremierLeague, 3);
draw(plotTopFixturesLaLiga, 4);