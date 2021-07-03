import "./PostPosted.scss";
import { useState, useEffect } from "react";

function PostPosted(props) {
  const gifs = props.TopLayerGifsSelected;
  const comment = props.comment;

  let gifsArray;
  if (props.isGifsPosted) {
    gifsArray = gifs.map((gifsrc) => {
      return <img src={gifsrc} width="100" height="100" />;
    });
  } else gifsArray = "";

  return (
    <div
      className={`PostPosted ${
        gifs.length > 0 || comment.length > 0 ? "active" : ""
      }`}
    >
      <div className="commentPosted col-50">
        <pre>{comment}</pre>
      </div>
      <div className="gifsPosted col-50">{gifsArray}</div>
    </div>
  );
}

export default PostPosted;
