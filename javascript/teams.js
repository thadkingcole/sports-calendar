// GLOBAL VARIABLES
let NFLteams;

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
      // NFLteams not previously saved
      // prevents API from being called unnecessarily
      if (!NFLteams) {
        console.log("football");
        const response = await fetch(
          "http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
        );
        const teamsObj = await response.json();
        NFLteams = teamsObj.sports[0].leagues[0].teams;
        // console.log(NFLteams);
      }
      break;

    case "NHL":
      console.log("hockey");
      break;

    default:
      console.log("no league selected");
      break;
  }
}
