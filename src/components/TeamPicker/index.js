import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";
import LEAGUES from "../../constants";

function TeamPicker({ changeMyTeams, myTeams }) {
  // STATE VARIABLES
  const [showCanvas, setShowCanvas] = useState(false);
  const [league, setLeague] = useState("");
  const [teamList, setTeamList] = useState([]);

  // HANDLER FUNCTIONS
  const handleShowCanvas = () => setShowCanvas(true);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleLeagueClick = (e) => showTeams(e.target.text.toLowerCase());
  const handleCheck = (e) => changeMyTeams(e.target);

  // HELPER FUNCTIONS
  async function showTeams(selectedLeague) {
    setLeague(selectedLeague);
    const url = `http://site.api.espn.com/apis/site/v2/sports/${LEAGUES[selectedLeague]}/${selectedLeague}/teams`;
    const res = await fetch(url);
    const data = await res.json();
    const { teams } = data.sports[0].leagues[0];
    setTeamList(teams);
  }

  return (
    <div className="bg-secondary">
      <Button variant="primary" onClick={handleShowCanvas}>
        Pick Teams
      </Button>
      <Offcanvas
        className="text-bg-dark"
        show={showCanvas}
        onHide={handleCloseCanvas}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Stack gap={2}>
            <Offcanvas.Title>Pick teams to add to the calendar</Offcanvas.Title>
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
          </Stack>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            {teamList.map((team) => {
              return (
                <Form.Check key={team.team.uid}>
                  <Form.Check.Input
                    type="checkbox"
                    checked={Boolean(myTeams[team.team.uid])}
                    onChange={handleCheck}
                    id={team.team.uid}
                    value={league}
                  ></Form.Check.Input>
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
