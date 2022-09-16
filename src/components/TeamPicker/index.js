import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";
import LEAGUES from "../../constants";

function TeamPicker({ myTeams, changeMyTeams, view, setView }) {
  // STATE VARIABLES
  const [showCanvas, setShowCanvas] = useState(false);
  const [league, setLeague] = useState("");
  const [teamList, setTeamList] = useState([]);

  // HANDLER FUNCTIONS
  const handleNavClick = (e) => setView(e.target.text);
  const handleShowCanvas = () => setShowCanvas(true);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleLeagueClick = (e) => showTeams(e.target.text.toLowerCase());
  const handleCheck = (e) => changeMyTeams(e.target);

  // HELPER FUNCTIONS
  async function showTeams(league) {
    setLeague(league);
    const url = `http://site.api.espn.com/apis/site/v2/sports/${LEAGUES[league]}/${league}/teams`;
    const data = await (await fetch(url)).json();
    const { teams } = data.sports[0].leagues[0];
    setTeamList(teams);
  }

  return (
    <>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            variant="primary"
            onClick={handleShowCanvas}
          >
            Pick Teams
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleNavClick} active={view === "Calendar"}>
              Calendar
            </Nav.Link>
            <Nav.Link onClick={handleNavClick} active={view === "List"}>
              List
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

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
                    data-sport={LEAGUES[league]}
                    data-name={team.team.displayName}
                    data-color={team.team.color}
                    data-logo={team.team.logos[0].href}
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
    </>
  );
}

export default TeamPicker;
