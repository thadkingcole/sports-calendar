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
    Object.keys(myTeams).forEach(async (id) => {
      // url to be called for the team for current season
      const url = await (
        await fetch(
          `http://sports.core.api.espn.com/v2/sports/${
            myTeams[id].sport
          }/leagues/${myTeams[id].league}/teams/${id.split("t:").pop()}`
        )
      ).json();

      getGameInfo(id, url.events.$ref + "&limit=200");
    });
  }, [myTeams]);

  // HELPER FUNCTIONS
  async function getGameInfo(teamId, url) {
    // list of events
    const events = await (await fetch(url)).json();
    // list of games
    events.items.forEach(async (event) => {
      const game = await (await fetch(event.$ref)).json();
      // game score
      const homeScore = await (
        await fetch(game.competitions[0].competitors[0].score.$ref)
      ).json();
      const awayScore = await (
        await fetch(game.competitions[0].competitors[1].score.$ref)
      ).json();
      // final vs in progress vs future
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
          awayScore: awayScore.value,
          homeScore: homeScore.value,
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
