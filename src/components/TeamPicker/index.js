import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";

function TeamPicker() {
  // STATE VARIABLES
  const [showCanvas, setShowCanvas] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [pickedTeams, setPickedTeams] = useState(() =>
    // initialize with localStorage
    JSON.parse(localStorage.getItem("pickedTeams"))
  );

  // update localStorage with each update to pickedTeams
  useEffect(() => {
    localStorage.setItem("pickedTeams", JSON.stringify(pickedTeams));
  }, [pickedTeams]);

  // handler functions
  const handleShowCanvas = () => setShowCanvas(true);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleLeagueClick = (e) => showTeams(e.target.text.toLowerCase());

  // helper functions
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
    setTeamList(teams);
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
            {teamList.map((team) => {
              return (
                <Form.Check key={team.team.uid}>
                  <Form.Check.Input
                    type="checkbox"
                    checked={Boolean(pickedTeams[team.team.uid])}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPickedTeams((prev) => ({
                          ...prev,
                          [team.team.uid]: team.team.displayName,
                        }));
                      } else {
                        setPickedTeams((current) => {
                          const copy = { ...current };
                          delete copy[team.team.uid];
                          return copy;
                        });
                      }
                    }}
                    value={team.team.uid}
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
