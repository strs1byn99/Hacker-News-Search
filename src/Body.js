import React from "react";
import "./Body.css";
import Convert from "./InnerHTML";

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    let newDate = new Date();
    let dd = newDate.getDate();
    let mm = newDate.getMonth() + 1;
    let yy = newDate.getFullYear();
    let hh = newDate.getHours();
    let min = newDate.getMinutes();
    let ss = newDate.getSeconds();
    this.state = {
      current: `${mm}/${dd}/${yy} ${hh}:${min}:${ss}`
    };
    this.handleDate = this.handleDate.bind(this);
    console.log(this.state.current);
  }

  handleDate(created_date) {
    var yy = created_date.substring(0, 4);
    var mm = created_date.substring(5, 7);
    var dd = created_date.substring(8, 10);
    var time = created_date.substring(11, 19);
    var date = new Date(`${mm}/${dd}/${yy} ${time}`);
    // var date = new Date("2020/07/10 20:44:33");
    var today = new Date(this.state.current);
    var Difference_In_Time = today.getTime() - date.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let year = Difference_In_Days / 365;
    // console.log(Difference_In_Days);
    // console.log(Difference_In_Time / (1000 * 3600));
    if (year < 1) {
      let month = (Difference_In_Days % 365) / 30;
      if (month < 1) {
        if (Difference_In_Days < 1) {
          let hour = Difference_In_Time / (1000 * 3600);
          if (hour < 1) {
            let time = Difference_In_Time / (1000 * 60);
            return `${Math.floor(time)} ${time < 2 ? "minute" : "minutes"} ago`;
          }
          return `${Math.floor(hour)} ${hour < 2 ? "hour" : "hours"} ago`;
        }
        return `${Math.floor(Difference_In_Days)} ${
          Difference_In_Days < 2 ? "day" : "days"
        } ago`;
      }
      return `${Math.floor(month)} ${month < 2 ? "month" : "months"} ago`;
    }
    return `${Math.floor(year)} ${year < 2 ? "year" : "years"} ago`;
  }

  render() {
    var posts = [];
    // console.log(this.props.posts);
    this.props.posts.forEach(x => {
      if (x.title != null) {
        // console.log(x.title);
        var time = this.handleDate(x.created_at);
        var url_tag;
        if (x.url != null && x.url.length !== 0) {
          url_tag = (
            <a className="sub-title" style={{ color: "grey" }} href={x.url}>
              ({x.url})
            </a>
          );
        }
        console.log(x);
        let story_id = x.story_id;
        let story_url = `https://2x19m.csb.app/items/${story_id}`;
        // console.log(`story url: ${story_url}`);
        var post = (
          <div className="post" key={x.objectID}>
            <div className="post-title">
              <a style={{ color: "black" }} href={story_url}>
                {x.title}
              </a>
              {url_tag}
            </div>
            <div className="post-detail">
              {x.points} points | {x.author} | {time} | {x.num_comments}{" "}
              comments
            </div>
            <div style={{ fontSize: "1em" }}>
              <Convert name={x.story_text} />
            </div>
          </div>
        );
        posts.push(post);
      }
    });
    return <div className="body">{posts}</div>;
  }
}
