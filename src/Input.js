import React from "react";
import "./styles.css";
// import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

export default class Input extends React.Component {
  handleChange(e) {
    this.props.onChange(e.target.name, e.target.value);
  }
  render() {
    return (
      <div>
        {/* <MDBCol md="6"> */}
        {/* <MDBFormInline className="md-form"> */}
        {/* <MDBIcon icon="search" /> */}
        <input
          className="searchbox"
          name="input"
          placeholder="Search stories by title, author, or url"
          onChange={this.handleChange.bind(this)}
        />
        {/* </MDBFormInline> */}
        {/* </MDBCol> */}
      </div>
    );
  }
}
