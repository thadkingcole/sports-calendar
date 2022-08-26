import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function List({ myGames, myTeams }) {
  return (
    <>
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
    </>
  );
}

export default List;
