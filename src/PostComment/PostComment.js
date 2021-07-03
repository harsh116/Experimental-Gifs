import { directive } from "@babel/types";
import React from "react";
import "./PostComment.scss";
import GifBox from "../GifBox/GifBox";
import { useState } from "react";
import PostComment_Navigation from "./PostComment_Navigation/PostComment_Navigation";

function PostComment(props) {
  const [isGifBoxLoaded, setGifBoxLoaded] = useState(false);
  const [isGifBoxVisible, setGifBoxVisible] = useState(true);
  const [PostLayerGifsSelected, setPostLayerGifsSelected] = useState([]);
  const [clearGifBoxGifs, setClearGifBoxGifs] = useState(false);

  const postData = () => {
    const comm = document
      .querySelector(".writeSection_type")
      .querySelector("textarea");
    props.setComment(comm.value);
    props.setPostComment_Overlay_status(false);
    props.setGifsPosted(true);
    props.setTopLayerGifsSelected(PostLayerGifsSelected);
    setPostLayerGifsSelected([]);
    setClearGifBoxGifs(true);
  };

  return (
    <div
      className={`PostComment_Overlay ${
        props.PostComment_Overlay_status ? "active" : ""
      }`}
    >
      <div className={`PostComment ${props.PostComment_Overlay_status}`}>
        <PostComment_Navigation
          nav_items={[
            {
              id: "Compose_Post",
              classes: {
                span: [],
                i: ["fa-pen", "m-sr"],
              },
              text: "Compose Post",
            },
          ]}
          crossOnClick={() => props.setPostComment_Overlay_status("")}
        />
        <div className="writeSection">
          <div className="writeSection_photo col-15">
            <img src="images/whatsapp profile pic.jpg"></img>
          </div>
          <div class="writeSection_type col-85">
            <textarea placeholder="Write something here"></textarea>
          </div>
        </div>
        <div className="features">
          <div
            className="gif"
            onClick={() => {
              setGifBoxLoaded(true);
              setGifBoxVisible(true);
            }}
          >
            <span className="gif_image">
              <img src="images/gif icon.PNG" />
            </span>
            <span className="gif_text"> GIF</span>
          </div>
        </div>
        <div className="activeButtons ">
          <button
            className="postButton"
            onClick={() => {
              postData();
              //   console.log("PostLayerGifsSelected: ", PostLayerGifsSelected);
            }}
          >
            Post
          </button>
        </div>
      </div>
      <GifBox
        isGifBoxLoaded={isGifBoxLoaded}
        setGifBoxLoaded={setGifBoxLoaded}
        isGifBoxVisible={isGifBoxVisible}
        setGifBoxVisible={setGifBoxVisible}
        setPostLayerGifsSelected={setPostLayerGifsSelected}
        clearGifBoxGifs={clearGifBoxGifs}
        setClearGifBoxGifs={setClearGifBoxGifs}
      />
    </div>
  );
}

export default PostComment;
