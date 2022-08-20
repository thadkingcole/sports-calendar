import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Offcanvas from "react-bootstrap/Offcanvas";

function TeamPicker() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [teams, setTeams] = useState([]);

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);
  const handleLeagueClick = (e) => showTeams(e.target.text.toLowerCase());

  async function showTeams(league) {
    const leagues = {
      mlb: "baseball",
      nba: "basketball",
      nfl: "football",
      nhl: "hockey",
    };
    const url = `http://site.api.espn.com/apis/site/v2/sports/${leagues[league]}/${league}/teams`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    const { teams } = data.sports[0].leagues[0];
    setTeams(teams);
  }

  return (
    <div className="bg-primary">
      <Button variant="primary" onClick={handleShowCanvas}>
        Pick Teams
      </Button>
      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Pick teams to add to the calendar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DropdownButton id="selectLeagueDD" title="Select League">
            <Dropdown.Item onClick={handleLeagueClick}>MLB</Dropdown.Item>
            <Dropdown.Item onClick={handleLeagueClick}>NBA</Dropdown.Item>
            <Dropdown.Item disabled onClick={handleLeagueClick}>
              NCAA Football
            </Dropdown.Item>
            <Dropdown.Item disabled onClick={handleLeagueClick}>
              NCAA Basketball
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLeagueClick}>NFL</Dropdown.Item>
            <Dropdown.Item onClick={handleLeagueClick}>NHL</Dropdown.Item>
          </DropdownButton>
          {teams.map((team) => team.team.displayName)}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default TeamPicker;
