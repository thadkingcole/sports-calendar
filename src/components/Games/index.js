import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import LEAGUES from "../../constants";

function Games({ myTeams }) {
  // STATE VARIABLES
  const [myGames, setMyGames] = useState({});

  // HOOKS
  useEffect(() => {
    // each time myTeams changes, need to get new list of games.
    // start with getting list of games for each team
    for (let id in myTeams) {
      // url to be colled for the team
      const url = `http://sports.core.api.espn.com/v2/sports/${
        LEAGUES[myTeams[id]]
      }/leagues/${myTeams[id]}/seasons/2022/teams/${id
        .split("t:")
        .pop()}/events?limit=200`;
      getGameInfo(url);
    }
  }, [myTeams]);

  // HELPER FUNCTIONS
  async function getGameInfo(url) {
    // list of events
    const eventsRes = await fetch(url);
    const events = await eventsRes.json();
    // list of games
    events.items.forEach(async (event) => {
      const gameRes = await fetch(event.$ref);
      const game = await gameRes.json();
      // game situation
      const sitRes = await fetch(game.competitions[0].situation.$ref);
      const sit = await sitRes.json();
      // last play (doesn't exist if game hasn't happened yet)
      const lpRes = sit.lastPlay && (await fetch(sit.lastPlay.$ref));
      const lp = lpRes && (await lpRes.json());
      // status
      const statusRes = await fetch(game.competitions[0].status.$ref);
      const status = await statusRes.json();
      // print to console.log (for now)
      // console.log({
      //   [game.uid]: {
      //     date: new Date(game.date),
      //     teams: game.name,
      //     status: status.type.shortDetail,
      //     awayScore: lp && lp.awayScore,
      //     homeScore: lp && lp.homeScore,
      //   },
      // });

      // ! this is what i'll need later
      // TODO currently no way to delete teams unchecked
      setMyGames((prev) => ({
        ...prev,
        [game.uid]: {
          date: new Date(game.date),
          teams: game.name,
          status: status.type.shortDetail,
          awayScore: lp && lp.awayScore,
          homeScore: lp && lp.homeScore,
        },
      }));

      // return {
      //   uid: game.uid,
      //   date: new Date(game.date),
      //   teams: game.name,
      //   status: status.type.shortDetail,
      //   awayScore: lp && lp.awayScore,
      //   homeScore: lp && lp.homeScore,
      // };
    });
  }

  return (
    <Container>
      {/* for each selected team... */}
      {/* {Object.keys(myTeams).map(async (id) => {
        const url = `http://sports.core.api.espn.com/v2/sports/${
          LEAGUES[myTeams[id]]
        }/leagues/${myTeams[id]}/seasons/2022/teams/${id
          .split("t:")
          .pop()}/events?limit=200`;
        // get each game they are in
        const gameData = await getGameInfo(url);

        // TODO actual return value
        return <div key={id}>{id}</div>;
      })} */}
    </Container>
  );
}

export default Games;
