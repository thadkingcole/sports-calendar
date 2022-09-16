import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Cal from "./Cal";
import List from "./List";

function Games({ myTeams, view }) {
  // STATE VARIABLES
  const [myGames, setMyGames] = useState({});

  // HOOKS
  useEffect(() => {
    // each time myTeams changes, get new list of games.
    // check for games that don't have my teams
    setMyGames((current) =>
      Object.keys(current).filter((gameId) =>
        Object.keys(myTeams).includes(current[gameId].myTeamId)
      )
    );
    // then get a list of games for each team
    Object.keys(myTeams).forEach((id) => {
      // url to be called for the team
      const url = `http://sports.core.api.espn.com/v2/sports/${
        myTeams[id].sport
      }/leagues/${myTeams[id].league}/seasons/2022/teams/${id
        .split("t:")
        .pop()}/events?limit=200`;
      getGameInfo(id, url);
    });
  }, [myTeams]);

  // HELPER FUNCTIONS
  async function getGameInfo(teamId, url) {
    // list of events
    const events = await (await fetch(url)).json();
    // list of games
    events.items.forEach(async (event) => {
      const game = await (await fetch(event.$ref)).json();
      // game situation
      // TODO getting error from baseball, no situation maybe?
      console.log(game.competitions[0]);
      const sit = await (
        await fetch(game.competitions[0].situation.$ref)
      ).json();
      // last play (doesn't exist if game hasn't happened yet)
      const lp =
        sit.lastPlay && (await (await fetch(sit.lastPlay.$ref)).json());
      // status
      const status = await (
        await fetch(game.competitions[0].status.$ref)
      ).json();
      // save to state
      setMyGames((prev) => ({
        ...prev,
        [game.uid]: {
          date: new Date(game.date),
          teams: game.name,
          short: game.shortName,
          status: status.type.shortDetail,
          awayScore: lp && lp.awayScore,
          homeScore: lp && lp.homeScore,
          myTeamId: teamId,
        },
      }));
    });
  }

  function UserView() {
    switch (view) {
      case "Calendar":
        return <Cal myGames={myGames} myTeams={myTeams} />;
      case "List":
        return <List myGames={myGames} myTeams={myTeams} />;
      default:
        return <div>Select a view above</div>;
    }
  }

  return (
    <Container>
      <UserView></UserView>
    </Container>
  );
}

export default Games;
