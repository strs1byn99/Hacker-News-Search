import axios from "axios";

// const SEARCH_TYPE = "search";
const BASE_URL = "https://hn.algolia.com/api/v1/";
const HPP = 1000;
// const TAG = "story";
const searchQuery = async (query, search_type, tag) => {
  let url = `${BASE_URL}${search_type}?query=${query}&tags=${tag}&hitsPerPage=${HPP}`;
  console.log(url);
  try {
    let res = await axios.get(url);
    var hits = res.data.hits;
  } catch (err) {
    console.log(err);
  }
  var result = [];
  hits.forEach(x => {
    if (tag === "story") {
      if (x.title != null) result.push(x);
    } else {
      if (x.comment_text != null) result.push(x);
    }
  });
  return result;
};

export default searchQuery;
