// ELEMENTS
const teamListEl = document.getElementById("teamList");

// GLOBAL VARIABLES
let NFLteams;
let teams;

async function show(league) {
  console.log(league);
  switch (league) {
    case "MLB":
      console.log("baseball");
      break;

    case "NBA":
      console.log("basketball");
      break;

    case "NFL":
      // only call API if NFLteams not loaded previously
      if (!NFLteams) {
        console.log("football");
        const response = await fetch(
          "http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
        );
        const teamsObj = await response.json();
        NFLteams = teamsObj.sports[0].leagues[0].teams;
        teams = NFLteams;
      }
      break;

    case "NHL":
      console.log("hockey");
      break;

    default:
      console.log("no league selected");
      break;
  }

  // NFL TEAMS WORK HERE
  // create list of teams
  teams.forEach((team) => {
    // create checkbox with team logo and team name

    // parent form-check
    const formCheck = document.createElement("div");
    formCheck.className = "form-check";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.value = "";
    checkbox.id = team.team.abbreviation;
    formCheck.appendChild(checkbox);

    // label: (logo) team name
    const teamLabel = document.createElement("label");
    teamLabel.className = "form-check-label";
    teamLabel.for = team.team.abbreviation;

    // make team logo
    const logoImg = document.createElement("img");
    logoImg.src = team.team.logos[0].href;
    logoImg.alt = team.team.abbreviation;
    logoImg.width = "20";
    logoImg.className = "me-1";

    // add logo and team name text
    teamLabel.appendChild(logoImg);
    logoImg.insertAdjacentText("afterend", team.team.displayName);

    // add label to form & team list
    formCheck.appendChild(teamLabel);
    teamListEl.appendChild(formCheck);
  });
}
