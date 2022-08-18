import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Offcanvas from "react-bootstrap/Offcanvas";

const TeamPicker = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

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
            <Dropdown.Item href="#/MLB">MLB</Dropdown.Item>
            <Dropdown.Item href="#/NBA">NBA</Dropdown.Item>
            {/* <Dropdown.Item href="#/NCAA Football">NCAA Football</Dropdown.Item> */}
            {/* <Dropdown.Item href="#/NCAA Basketball">
              NCAA Basketbal
            </Dropdown.Item> */}
            <Dropdown.Item href="#/NFL">NFL</Dropdown.Item>
            <Dropdown.Item href="#/NHL">NHL</Dropdown.Item>
          </DropdownButton>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default TeamPicker;
