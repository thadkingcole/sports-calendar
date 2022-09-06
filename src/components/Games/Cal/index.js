import React, { useState } from "react";
import Table from "react-bootstrap/Table";

const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function Cal() {
  const [day, setDay] = useState(new Date());
  const [firstDay, setFirstDay] = useState(
    new Date(day.getFullYear(), day.getMonth(), 1)
  );
  return (
    <Table bordered variant="dark" className="text-center">
      <thead>
        <tr>
          <th>{"<<"}</th>
          <th>{"<"}</th>
          <th colSpan={3}>
            {day.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </th>
          <th>{">"}</th>
          <th>{">>"}</th>
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
        {Array.from({ length: 5 }).map((row, i) => (
          <tr key={`weekNo${i}`}>
            {Array.from({ length: 7 }).map((col, j) => {
              const newDay = new Date(
                firstDay.getFullYear(),
                firstDay.getMonth(),
                firstDay.getDate() - firstDay.getDay() + j + 7 * i
              );
              return <td key={newDay}>{newDay.getDate()}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Cal;
