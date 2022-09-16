import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./calendar.css";

const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function Cal({ myGames, myTeams }) {
  // STATE VARIABLES
  const [day, setDay] = useState(new Date());
  const [firstDay, setFirstDay] = useState(
    new Date(day.getFullYear(), day.getMonth(), 1).getDay()
  );
  const [monthRange, setMonthRange] = useState([
    new Date(day.getFullYear(), day.getMonth(), 1 - firstDay),
    new Date(day.getFullYear(), day.getMonth(), 1 - day.getDay() + 42),
  ]);
  const [visibleGames, setVisibleGames] = useState(
    Object.values(myGames).filter(
      (game) => game.date >= monthRange[0] && game.date <= monthRange[1]
    )
  );

  // EFFECTS
  // new firstDay each time the selected month changes
  useEffect(() => {
    setFirstDay(new Date(day.getFullYear(), day.getMonth(), 1).getDay());
  }, [day]);
  // change month range as month changes
  useEffect(() => {
    setMonthRange([
      new Date(day.getFullYear(), day.getMonth(), 1 - firstDay),
      new Date(day.getFullYear(), day.getMonth(), 1 - day.getDay() + 42),
    ]);
  }, [day, firstDay]);
  // on load, filter games for selected month
  useEffect(() => {
    setVisibleGames(
      Object.values(myGames).filter(
        (game) => game.date >= monthRange[0] && game.date <= monthRange[1]
      )
    );
  }, [day, monthRange, myGames]);

  // HANDLER FUNCTIONS
  const handleClick = (e) => changeMonth(e.target.textContent);
  const calendarStyle = (calDay) => {
    let cn = "";
    calDay.getMonth() === day.getMonth() || (cn += "text-secondary");
    sameDay(calDay, new Date()) && (cn += " bg-primary");
    return cn;
  };

  // HELPER FUNCTIONS
  function changeMonth(change) {
    switch (change) {
      case "<<":
        // back 1 year
        setDay(new Date(day.getFullYear() - 1, day.getMonth()));
        break;
      case "<":
        // back 1 month
        setDay(new Date(day.getFullYear(), day.getMonth() - 1));
        break;
      case ">":
        // forward 1 month
        setDay(new Date(day.getFullYear(), day.getMonth() + 1));
        break;
      case ">>":
        // forward 1 year
        setDay(new Date(day.getFullYear() + 1, day.getMonth()));
        break;

      default:
        break;
    }
  }

  function sameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  return (
    <Table bordered variant="dark" className="text-center">
      <thead>
        <tr>
          <th onClick={handleClick}>{"<<"}</th>
          <th onClick={handleClick}>{"<"}</th>
          <th colSpan={3}>
            {day.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </th>
          <th onClick={handleClick}>{">"}</th>
          <th onClick={handleClick}>{">>"}</th>
        </tr>
        <tr>
          {daysOfTheWeek.map((day) => (
            <th scope="col" key={day}>
              {day.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }).map((row, i) => (
          <tr key={`weekNo${i}`}>
            {Array.from({ length: 7 }).map((col, j) => {
              const newDay = new Date(
                day.getFullYear(),
                day.getMonth(),
                1 - firstDay + j + 7 * i
              );
              return (
                <td key={newDay} className={calendarStyle(newDay)}>
                  {newDay.getDate()}
                  {visibleGames
                    .filter((game) => sameDay(game.date, newDay))
                    .sort((a, b) => a.date - b.date)
                    .map((game) => (
                      <div
                        key={game.date + game.myTeamId}
                        className="text-white"
                        style={{
                          backgroundColor: `#${
                            Object.keys(myTeams).includes(game.myTeamId) &&
                            myTeams[game.myTeamId].color
                          }`,
                        }}
                      >
                        <img
                          src={myTeams[game.myTeamId].logo}
                          alt={myTeams[game.myTeamId].name}
                          width="30"
                          className="float-start"
                        />
                        <div>
                          {game.date.toLocaleTimeString(undefined, {
                            timeStyle: "short",
                          })}
                        </div>
                        <div>{game.short}</div>
                      </div>
                    ))}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Cal;
