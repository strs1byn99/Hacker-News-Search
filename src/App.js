import React from "react";
import "./styles.css";
import axios from "axios";
import Input from "./Input";
import Body from "./Body";
import * as Icon from "react-bootstrap-icons";
import Pagination from "react-js-pagination";
import searchQuery from "./search";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdowns from "./Dropdowns";
import Comment from "./Comment";
import R from "./R";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      posts: [],
      filterred: [],
      currentPage: 1,
      postsPerPage: 20,
      currentTag: "Stories",
      search_by_date: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    try {
      let res = await axios.get(
        "https://hn.algolia.com/api/v1/search?hitsPerPage=1000"
      );
      var hits = res.data.hits;
    } catch (err) {
      console.log(err);
    }
    var result = [];
    hits.forEach(x => {
      if (x.title != null) result.push(x);
    });
    this.setState({ posts: result });
  };

  handleChange(field, value) {
    this.setState({ [field]: value }, function() {
      console.log(this.state.input);
      (async () => {
        this.setState({ filterred: await this.filterPosts(value) });
      })();
    });
  }

  async filterPosts(inputValue) {
    console.log(111);
    var filterred = [];
    if (inputValue != null) {
      let tag = this.state.currentTag === "Stories" ? "story" : "comment";
      let search_type = this.state.search_by_date ? "search_by_date" : "search";
      filterred = await searchQuery(inputValue, search_type, tag);
      console.log("fill");
      return filterred;
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  handleTag(value) {
    this.setState({ currentTag: value }, function() {
      console.log(`In App.js: ${this.state.currentTag}`);
      (async () => {
        this.setState({ filterred: await this.filterPosts(this.state.input) });
      })();
    });
  }

  handleType(value) {
    this.setState({ search_by_date: value }, function() {
      console.log(`In App.js: ${this.state.search_by_date}`);
      (async () => {
        this.setState({ filterred: await this.filterPosts(this.state.input) });
      })();
    });
  }

  render() {
    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const totalPosts =
      this.state.filterred.length === 0 && !this.state.input
        ? this.state.posts
        : this.state.filterred;
    const currentPosts = totalPosts.slice(indexOfFirstPost, indexOfLastPost);
    // console.log(currentPosts);

    var body;
    if (this.state.currentTag === "Stories") {
      body = <Body posts={currentPosts} />;
    } else {
      body = <Comment posts={currentPosts} />;
    }

    return (
      <div className="background">
        <div className="container-box">
          <div className="header">
            <div className="title">Hacker News Search</div>
            <Input onChange={this.handleChange} />
          </div>
          <Dropdowns
            currentTag={this.state.currentTag}
            search_by_date={this.state.search_by_date}
            onClick={this.handleTag}
            onChange={this.handleType}
          />
          {body}
          {/* <Body posts={currentPosts} /> */}
          <div className="paginate text-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.postsPerPage}
              totalItemsCount={totalPosts.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
          <div className="foot">
            Made with{" "}
            <Icon.Heart style={{ marginBottom: "-.2em", color: "red" }} /> by
            Perry Yang
          </div>
        </div>
        <R />
      </div>
    );
  }
}

export default App;
