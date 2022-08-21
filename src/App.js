import { useEffect, useState } from "react";
import Top from "./components/Top";
import TeamPicker from "./components/TeamPicker";
import Games from "./components/Games";

function App() {
  // STATE VARIABLES
  const [myTeams, setMyTeams] = useState(
    // init w/ localStorage OR empty object
    () => JSON.parse(localStorage.getItem("myTeams")) || {}
  );

  // HOOKS
  useEffect(() => {
    // update localStorage with each change to myTeams
    localStorage.setItem("myTeams", JSON.stringify(myTeams));
  }, [myTeams]);

  // HELPER FUNCTIONS
  function changeMyTeams(team) {
    team.checked
      ? setMyTeams((prev) => ({ ...prev, [team.id]: team.value }))
      : setMyTeams((current) => {
          const copy = { ...current };
          delete copy[team.id];
          return copy;
        });
  }

  return (
    <div className="App">
      <Top />
      <TeamPicker changeMyTeams={changeMyTeams} myTeams={myTeams} />
      <Games myTeams={myTeams} />
    </div>
  );
}

export default App;
