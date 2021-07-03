// import logo from './logo.svg';
import "./App.css";
import "./test.scss";
import "./App.scss";
import PostComment from "./PostComment/PostComment";
import PostPosted from "./PostPosted/PostPosted";

import { useState, useEffect } from "react";

function App() {
  const [PostComment_Overlay_status, setPostComment_Overlay_status] =
    useState("");
  const [TopLayerGifsSelected, setTopLayerGifsSelected] = useState([]);
  const [comment, setComment] = useState("");
  const [isGifsPosted, setGifsPosted] = useState(false);

  // console.log("TopLayerGifsSelected: ", TopLayerGifsSelected);

  return (
    <div className="App">
      <h1 className="main_heading">Post Comment and Gifs</h1>
      <button
        className="enablePostComment"
        onClick={() => {
          setPostComment_Overlay_status("active");
          const textarea = document
            .querySelector(".writeSection_type")
            .querySelector("textarea");
          textarea.value = "";
          // setComment("");
        }}
      >
        <i className="fas fa-comments"></i>
      </button>
      <PostComment
        PostComment_Overlay_status={PostComment_Overlay_status}
        setPostComment_Overlay_status={setPostComment_Overlay_status}
        setTopLayerGifsSelected={setTopLayerGifsSelected}
        setComment={setComment}
        setGifsPosted={setGifsPosted}
      />
      <div className="breakLines"></div>
      <h2>Posts</h2>
      <PostPosted
        TopLayerGifsSelected={TopLayerGifsSelected}
        comment={comment}
        isGifsPosted={isGifsPosted}
      />

      {/* <iframe
        src="https://giphy.com/embed/Q73lYjzETOBZhYxpOL"
        width="480"
        height="462"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe> */}

      {/* <p style={{ position: "fixed", bottom: "2rem" }}>Lorem ipsum</p> */}
    </div>
  );
}

export default App;
