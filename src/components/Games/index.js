import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
      // url to be colled for the team
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
    const eventsRes = await fetch(url);
    const events = await eventsRes.json();
    // list of games
    events.items.forEach(async (event) => {
      const gameRes = await fetch(event.$ref);
      const game = await gameRes.json();
      // game situation
      // TODO getting error from baseball, no situation maybe?
      // console.log(game.competitions[0])
      const sitRes = await fetch(game.competitions[0].situation.$ref);
      const sit = await sitRes.json();
      // last play (doesn't exist if game hasn't happened yet)
      const lpRes = sit.lastPlay && (await fetch(sit.lastPlay.$ref));
      const lp = lpRes && (await lpRes.json());
      // status
      const statusRes = await fetch(game.competitions[0].status.$ref);
      const status = await statusRes.json();
      // save to state
      setMyGames((prev) => ({
        ...prev,
        [game.uid]: {
          date: new Date(game.date),
          teams: game.name,
          status: status.type.shortDetail,
          awayScore: lp && lp.awayScore,
          homeScore: lp && lp.homeScore,
          myTeamId: teamId,
        },
      }));
    });
  }

  return (
    <Container>
      <Row>
        <Col>Date</Col>
        <Col>Game</Col>
        <Col>Away</Col>
        <Col>Home</Col>
        <Col>Status</Col>
      </Row>
      {Object.entries(myGames)
        .sort(([_, a], [__, b]) => a.date - b.date)
        .map(([id, game]) => {
          return (
            Object.keys(myTeams).includes(game.myTeamId) && (
              <Row
                key={id}
                className="text-white"
                style={{
                  backgroundColor: `#${myTeams[game.myTeamId].color}`,
                }}
              >
                <Col>{game.date.toDateString()}</Col>
                <Col>{game.teams}</Col>
                <Col>{game.awayScore} </Col>
                <Col>{game.homeScore}</Col>
                <Col>{game.status}</Col>
              </Row>
            )
          );
        })}
    </Container>
  );
}

export default Games;
