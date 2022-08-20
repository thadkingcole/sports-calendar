import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
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
    const res = await fetch(url);
    const data = await res.json();
    const { teams } = data.sports[0].leagues[0];
    console.log(teams);
    setTeams(teams);
  }

  return (
    <div className="bg-primary">
      <Button variant="primary" onClick={handleShowCanvas}>
        Pick Teams
      </Button>
      <Offcanvas
        className="text-bg-dark"
        show={showCanvas}
        onHide={handleCloseCanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Pick teams to add to the calendar:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DropdownButton
            className="mb-3"
            id="selectLeagueDD"
            title="Select League"
          >
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
          <Form>
            {teams.map((team) => {
              return (
                <Form.Check key={team.team.uid}>
                  <Form.Check.Input type="checkbox"></Form.Check.Input>
                  <Form.Check.Label>
                    <img
                      src={team.team.logos[0].href}
                      alt={team.team.displayName}
                      width="25"
                      className="me-2"
                    />
                    {team.team.displayName}
                  </Form.Check.Label>
                </Form.Check>
              );
            })}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default TeamPicker;
