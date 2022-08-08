// ELEMENTS
const teamListEl = document.getElementById("teamList");

// TEAM LISTS
let NFLteams; // list of NFL teams
let teamList; // visible team list

// this function runs each time a league is selected on the dropdown menu
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
      console.log("football");
      // only call API if NFLteams not loaded previously
      if (!NFLteams) {
        const response = await fetch(
          "http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
        );
        const teamsObj = await response.json();
        NFLteams = teamsObj.sports[0].leagues[0].teams;
      }
      teamList = NFLteams;
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
  teamList.forEach((team) => {
    // create checkbox with team logo and team name

    // parent form-check
    const formCheck = document.createElement("div");
    formCheck.className = "form-check";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.value = "";
    checkbox.id = team.team.uid;
    checkbox.checked = localStorage.getItem(team.team.uid);
    formCheck.appendChild(checkbox);
    checkbox.addEventListener("change", () => {
      console.log(checkbox.id, checkbox.checked);
      checkbox.checked
        ? localStorage.setItem(team.team.uid, checkbox.checked)
        : localStorage.removeItem(team.team.uid);
      // localStorage.setItem(team.team.uid, checkbox.checked);
    });

    console.log(team.team.uid, Boolean(localStorage.getItem(team.team.uid)));

    // label: (logo) team name
    const teamLabel = document.createElement("label");
    teamLabel.className = "form-check-label";
    teamLabel.for = team.team.uid;

    // make team logo
    const logoImg = document.createElement("img");
    logoImg.src = team.team.logos[0].href;
    logoImg.alt = team.team.uid;
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
