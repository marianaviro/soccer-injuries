import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import injuriesLL2020 from "../data/la-liga-2020.json";
import injuriesLL2021 from "../data/la-liga-2021.json";
import injuriesLL2022 from "../data/la-liga-2022.json";
import injuriesPL2020 from "../data/premier-league-2020.json";
import injuriesPL2021 from "../data/premier-league-2021.json";
import injuriesPL2022 from "../data/premier-league-2022.json";
import fixturesLL2020 from "../data/fixtures-la-liga-2020.json";
import fixturesLL2021 from "../data/fixtures-la-liga-2021.json";
import fixturesLL2022 from "../data/fixtures-la-liga-2022.json";
import fixturesPL2020 from "../data/fixtures-premier-league-2020.json";
import fixturesPL2021 from "../data/fixtures-premier-league-2021.json";
import fixturesPL2022 from "../data/fixtures-premier-league-2022.json";

export const leagues = ["La Liga", "Premier League"];

export const dataInjuries = injuriesLL2020.concat(
  injuriesLL2021.concat(
    injuriesLL2022.concat(
      injuriesPL2020.concat(injuriesPL2021.concat(injuriesPL2022))
    )
  )
);

export const dataFixtures = fixturesLL2020.concat(
  fixturesLL2021.concat(
    fixturesLL2022.concat(
      fixturesPL2020.concat(fixturesPL2021.concat(fixturesPL2022))
    )
  )
);

export const missingFixtures = dataInjuries.map((injury) => ({
  playerId: injury.player.id,
  player: injury.player.name,
  type: injury.player.type,
  reason: injury.player.reason,
  teamId: injury.team.id,
  team: injury.team.name,
  fixtureId: injury.fixture.id,
  date: injury.fixture.date,
  timestamp: injury.fixture.timestamp,
  leagueId: injury.league.id,
  season: injury.league.season,
  league: injury.league.name,
  country: injury.league.country,
}));

export const fixtures = dataFixtures.map((fixture) => ({
  fixtureId: fixture.fixture.id,
  status: fixture.fixture.status.short,
  timezone: fixture.fixture.timezone,
  date: fixture.fixture.date,
  timestamp: fixture.fixture.timestamp,
  leagueId: fixture.league.id,
  league: fixture.league.name,
  homeTeamId: fixture.teams.home.id,
  homeTeamName: fixture.teams.home.name,
  awayTeamId: fixture.teams.away.id,
  awayTeamName: fixture.teams.away.name,
}));

export const injuries = missingFixtures
  .filter(
    (d) =>
      d.reason !== "Yellow Cards" &&
      d.reason !== "Red Card" &&
      d.reason !== "Suspended" &&
      d.reason !== "Inactive" &&
      d.reason !== "National selection" &&
      d.reason !== "Coach's decision" &&
      d.reason !== "Rest" &&
      d.reason !== "Personal Reasons" &&
      d.reason !== "Loan agreement" &&
      d.type !== "Questionable"
  )
  .map((injury) => {
    let fx = fixtures.find((f) => f.fixtureId === injury.fixtureId);
    if (fx) {
      const format = d3.timeFormat("%d %b %y");
      const dateObj = new Date(fx.date);
      const dateShort = format(dateObj);
      return {
        dateShort,
        date: dateObj,
        fixtureName: `${fx.homeTeamName} vs. ${fx.awayTeamName} (${dateShort})`,
        ...injury,
      };
    } else {
      return {
        fixtureName: "N/A",
        date: null,
        dateShort: null,
        ...injury,
      };
    }
  });

export const injuries2021 = injuries.filter((injury) => injury.season === 2021);

export const injuriesPremierLeague2021 = injuries2021.filter(
  (injury) => injury.leagueId === 39
);

export const injuriesLaLiga2021 = injuries2021.filter(
  (injury) => injury.leagueId === 140
);
