import React from "react";
import LEAGUES from "../../constants";

function Main({ myTeams }) {
  async function getGameInfo(url) {
    // list of events
    const eventsRes = await fetch(url);
    const events = await eventsRes.json();
    // specific game info
    events.items.map(async (event) => {
      const gameRes = await fetch(event.$ref);
      const game = await gameRes.json();
      // game situation (doesn't exist if game hasn't happened yet)
      // TODO don't drill into $ref if no situation...
      // TODO error catching is needed here
      const sitRes = await fetch(game.competitions[0].situation.$ref);
      const sit = await sitRes.json();
      // last play
      const lpRes = await fetch(sit.lastPlay.$ref);
      const lp = await lpRes.json();
      // status
      const statusRes = await fetch(game.competitions[0].status.$ref);
      const status = await statusRes.json();
      // print to console.log (for now)
      console.log(
        game.date,
        lp.awayScore,
        game.name,
        lp.homeScore,
        status.type.shortDetail
      );
    });
  }
  // console.log(Object.keys(myTeams).pop())
  return (
    <div>
      {Object.keys(myTeams).map((id) => {
        // console.log(LEAGUES[myTeams[id]]);
        const url = `http://sports.core.api.espn.com/v2/sports/${
          LEAGUES[myTeams[id]]
        }/leagues/${myTeams[id]}/seasons/2022/teams/${id
          .split("t:")
          .pop()}/events?limit=200`;
        getGameInfo(url);
        // console.log(data);

        // TODO actual return value
        return <div key={id}>{id}</div>;
      })}
    </div>
  );
}

export default Main;
