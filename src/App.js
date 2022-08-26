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
  const [view, setView] = useState(
    // init from localStorage, default calendar
    () => localStorage.getItem("view") || "Calendar"
  );

  // HOOKS
  useEffect(() => {
    // update localStorage with each change to myTeams
    localStorage.setItem("myTeams", JSON.stringify(myTeams));
  }, [myTeams]);
  useEffect(() => localStorage.setItem("view", view), [view]);

  // HELPER FUNCTIONS
  function changeMyTeams(team) {
    team.checked
      ? setMyTeams((prev) => ({
          ...prev,
          [team.id]: {
            league: team.value,
            ...team.dataset,
          },
        }))
      : setMyTeams((current) => {
          const copy = { ...current };
          delete copy[team.id];
          return copy;
        });
  }

  return (
    <div className="App">
      <Top />
      <TeamPicker
        myTeams={myTeams}
        changeMyTeams={changeMyTeams}
        view={view}
        setView={setView}
      />
      <Games myTeams={myTeams} view={view}/>
    </div>
  );
}

export default App;
