import React from "react";
import ReactHtmlParser from "react-html-parser";

class Convert extends React.Component {
  render() {
    // var parser = ReactHtmlParser(this.props.name);
    return (
      // <div
      //   dangerouslySetInnerHTML={{ __html: this.htmlDecode(this.props.name) }}
      // />
      // <div>
      //   {this.props.name.split('\n').map(item => (
      //     <span>
      //       {item} <br />
      //     </span>
      //   ))}
      // </div>
      <div>{ReactHtmlParser(this.props.name)}</div>
    );
  }
}

export default Convert;
