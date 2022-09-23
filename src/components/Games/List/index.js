import React from "react";
import Table from "react-bootstrap/Table";
import "./list.css";
import "../../../tools/textColor";
import { getTextColor } from "../../../tools/textColor";

function List({ myGames, myTeams }) {
  return (
    <Table id="list" size="sm" className="text-center">
      <thead className="bg-dark text-light">
        <tr>
          <th>Date</th>
          <th>Game</th>
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
                  style={{
                    backgroundColor: `#${myTeams[game.myTeamId].color}`,
                    color: getTextColor(`#${myTeams[game.myTeamId].color}`),
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
                    {": "}
                    {game.awayScore}
                    {" @ "}
                    {game.teams.split(" at ")[1]}
                    {": "}
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
