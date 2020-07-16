import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const dropdownsStyle = {
  width: "100%",
  display: "inline-flex",
  backgroundColor: "whitesmoke",
  flex: 1,
  alignItems: "center",
  padding: ".2rem 1rem"
};

const dropdownBtnStyle = {
  padding: "0 .6em"
};

class Dropdowns extends React.Component {
  handleTag(tag) {
    this.props.onClick(tag);
  }

  handleType(type) {
    this.props.onChange(type === "Date" ? 1 : 0);
  }

  render() {
    return (
      <div style={dropdownsStyle}>
        Search
        <DropdownButton
          style={dropdownBtnStyle}
          id="dropdown-basic-button"
          title={this.props.currentTag}
          variant="outline-secondary"
        >
          <Dropdown.Item onClick={e => this.handleTag("Stories", e)}>
            Stories
          </Dropdown.Item>
          <Dropdown.Item onClick={e => this.handleTag("Comments", e)}>
            Comments
          </Dropdown.Item>
        </DropdownButton>
        by
        <DropdownButton
          style={dropdownBtnStyle}
          id="dropdown-basic-button"
          title={this.props.search_by_date ? "Date" : "Popularity"}
          variant="outline-secondary"
        >
          <Dropdown.Item onClick={e => this.handleType("Popularity", e)}>
            Popularity
          </Dropdown.Item>
          <Dropdown.Item onClick={e => this.handleType("Date", e)}>
            Date
          </Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default Dropdowns;
