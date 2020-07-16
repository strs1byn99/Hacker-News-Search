import React from "react";
import "./Body.css";
import Convert from "./InnerHTML";
import { Link } from "react-router-dom";
import R from "./R";

class Comment extends React.Component {
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
    console.log(this.props.posts);
    this.props.posts.forEach(x => {
      if (x.comment_text != null) {
        // console.log(x.story_title);
        var time = this.handleDate(x.created_at);
        let story_id = x.story_id;
        let story_url = `https://2x19m.csb.app/items/`;
        console.log(`story url: ${story_url}`);
        var post = (
          <div className="post" key={x.objectID}>
            <div className="post-detail">
              {x.points} points | {x.author} | {time} | on:{" "}
              <Link to={`/items`}>{x.story_title}</Link>
            </div>
            {/* parent section not yet setup */}
            <div className="post-title">
              <Convert name={x.comment_text} />
            </div>
          </div>
        );
        posts.push(post);
      }
    });
    return (
      <div className="body">
        {posts}
        <R />
      </div>
    );
  }
}

export default Comment;
