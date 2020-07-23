import React from "react";
import "./styles.css";
import axios from "axios";
import Convert from "./InnerHTML";

const backgroundStyle = {
  backgroundColor: "whitesmoke",
  fontFamily: "Raleway, sans-serif",
  padding: "10px",
  minHeight: "100vh"
};

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: "",
      loading: true
    };
    this.fetchStory = this.fetchStory.bind();
  }

  componentDidMount() {
    this.fetchStory(this.props.match.params.id);
  }

  fetchStory = async id => {
    let url = `https://hn.algolia.com/api/v1/items/${id}`;
    try {
      var res = await axios.get(url);
      console.log(`in post detail:`);
      console.log(res.data);
      res = res.data;
      this.setState({ story: res, loading: false });
    } catch (err) {
      console.log(err);
    }
    return res;
  };
  render() {
    if (this.state.loading) {
      return (
        <div className="background">
          <div className="container-box">
            <div className="header">
              <div className="title">Hacker News Search</div>
            </div>
          </div>
        </div>
      );
    } else {
      let date = this.state.story.created_at.substring(0, 10);
      return (
        <div className="background">
          <div className="container-box">
            <div className="header">
              <div className="title">Hacker News Search</div>
            </div>
            <div style={backgroundStyle}>
              <div style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>
                {this.state.story.title}
              </div>
              <div style={{ fontSize: "1.2rem", color: "grey" }}>
                {this.state.story.points} points by {this.state.story.author} on{" "}
                {date}
              </div>
              <Convert name={this.state.story.text} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PostDetail;
