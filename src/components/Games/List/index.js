import React from "react";
import Table from "react-bootstrap/Table";
import "./list.css";

function List({ myGames, myTeams }) {
  return (
    <Table size="sm" className="text-center">
      <thead>
        <tr>
          <th>Date</th>
          <th colSpan={3}>Game</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(myGames)
          .sort(([_, a], [__, b]) => a.date - b.date)
          .map(([id, game]) => {
            return (
              Object.keys(myTeams).includes(game.myTeamId) && (
                <tr
                  key={id}
                  className="text-white"
                  style={{
                    backgroundColor: `#${myTeams[game.myTeamId].color}`,
                  }}
                >
                  <td>
                    <img
                      src={myTeams[game.myTeamId].logo}
                      alt={myTeams[game.myTeamId].name}
                      width="45"
                      className="float-start"
                    />
                    {game.date.toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>
                    {game.teams.split(" at ")[0]}
                    <br />
                    {game.awayScore}
                  </td>
                  <td>at</td>
                  <td>
                    {game.teams.split(" at ")[1]}
                    <br />
                    {game.homeScore}
                  </td>
                  <td>
                    {(game.status.includes("Final") ||
                      game.status.includes("Postponed")) &&
                      game.status}
                  </td>
                </tr>
              )
            );
          })}
      </tbody>
    </Table>
  );
}

export default List;
