import "./GifBox.scss";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import PostComment_Navigation from "../PostComment/PostComment_Navigation/PostComment_Navigation";

const GifBox = (props) => {
  const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

  const [GifsSelected, setGifsSelected] = useState([]);
  const [confirmButtonstatus, setConfirmButtonstatus] = useState(false);
  const [gifsstate, setGifsstate] = useState("Trending");
  const [gifsDataSearched, setGifsDataSearched] = useState([]);

  if (props.clearGifBoxGifs) {
    props.setClearGifBoxGifs(false);
  }

  // * ------ Functions------------ *

  const confirmGifsAction = () => {
    props.setGifBoxVisible(false);
    props.setPostLayerGifsSelected(GifsSelected);
  };

  const highlightTrending = () => {
    const trending = document.querySelector("#Trending");
    const search = document.querySelector("#Search");

    trending.classList.add("selected");
    search.classList.remove("selected");
  };

  const highlightSearch = () => {
    const search = document.querySelector("#Search");
    const trending = document.querySelector("#Trending");

    search.classList.add("selected");
    trending.classList.remove("selected");
  };

  /* TODO
   */

  //   useEffect(() => {
  //     console.log("GifsSelected: ", GifsSelected);
  //     props.setTopLayerGifsSelected(GifsSelected);
  //   }, [GifsSelected]);

  //   console.log("GifsSelected: ", GifsSelected);

  const selectImage = (event) => {
    // console.log(event.target);
    const newArray = GifsSelected.map((ele) => ele);
    const src = event.target.getAttribute("src");

    if (event.target.className === "") {
      event.target.className = "selected";

      console.log("src=", src);

      newArray.push(src);
    } else {
      event.target.className = "";
      const index = newArray.indexOf(src);
      if (index > -1) newArray.splice(index, 1);
    }

    setGifsSelected(newArray);
    if (newArray.length > 0) {
      setConfirmButtonstatus(true);
    } else {
      setConfirmButtonstatus(false);
    }
  };

  const resetSelectedGifs = () => {
    setConfirmButtonstatus(false);
    setGifsSelected([]);
    const gifs = document.querySelector(".gifs");
    const gifsImages = gifs.querySelectorAll("img");

    gifsImages.forEach((gifsImage) => {
      gifsImage.className = "";
    });
  };

  if (props.clearGifBoxGifs) {
    setTimeout(() => {
      resetSelectedGifs();
      props.setClearGifBoxGifs(false);
    }, 0);
  }
  // *------------- Rendering Gifs ----------------*
  const renderGifs = (data) => {
    return data.map((ele) => {
      return (
        <img
          className={
            ele.images.fixed_height.url ===
            GifsSelected.find((elem) => elem === ele.images.fixed_height.url)
              ? "selected"
              : ""
          }
          src={ele.images.fixed_height.url}
          onClick={selectImage}
        />
      );
    });
  };

  const renderGifsSearch = (data) => {
    return data.map((ele) => {
      return (
        <img
          className={
            ele.images.fixed_height.url ===
            GifsSelected.find((elem) => elem === ele.images.fixed_height.url)
              ? "selected"
              : ""
          }
          src={ele.images.fixed_height.url}
          onClick={selectImage}
        />
      );
    });
  };

  // * --------------- States 2 ----------- *

  const [isGifsLoaded, setGifsLoaded] = useState(false);
  //   const [isGifsSearchLoaded, setGifsSearchLoaded] = useState(false);
  const [gifData, setGifData] = useState([]);
  const [isLoadPending, setLoadPending] = useState(false);
  const [gifSearchText, setGifSearchText] = useState("");

  if (gifSearchText.length > 0) {
    axios("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: GIPHY_API_KEY,
        q: gifSearchText,
        limit: 30,
      },
    }).then((obj) => {
      console.log("obj search: ", obj);
      setGifSearchText("");
      setGifsDataSearched(obj.data.data);

      //   setGifsSearchLoaded(true);
    });
  }

  if (props.isGifBoxLoaded && !isGifsLoaded) {
    // const div = document.querySelector("#GifBox");
    // if (div) {
    //   div.className = "GifBox";
    //   div.innerHTML = `
    //     <p>Loading</p>
    //     `;

    axios("https://api.giphy.com/v1/gifs/trending", {
      params: {
        api_key: GIPHY_API_KEY,
        limit: 30,
      },
    })
      // .then((res) => res.json())
      .then((obj) => {
        // setLoadPending(false);
        setGifsLoaded(true);
        setGifData(obj.data.data);
        // setGifBoxVisible(true);
        console.log("gifobj: ", obj);
      })
      .catch((err) => {
        console.log(err);
        setLoadPending(false);
      });
  }

  if (props.isGifBoxLoaded && isGifsLoaded && gifData.length > 0) {
    return (
      <div
        id="Gifbox"
        className={`GifBox ${props.isGifBoxVisible ? "visible" : ""}`}
      >
        <PostComment_Navigation
          nav_items={[
            {
              id: "Trending",
              classes: {
                span: ["fa-line-chart", "m-yr", "fa", "selected"],
                i: [],
              },
              text: "Trending",
              onClick: () => {
                highlightTrending();
                setGifsstate("Trending");
              },
            },

            {
              id: "Search",
              classes: {
                span: [],
                i: ["fa-search", "m-sr"],
              },
              text: "Search",
              onClick: () => {
                highlightSearch();
                setGifsstate("Search");
              },
            },
          ]}
          crossOnClick={() => {
            props.setGifBoxVisible(false);
            resetSelectedGifs();
          }}
        />
        {gifsstate === "Trending" ? (
          <Fragment />
        ) : (
          <div className="gifSearchBar ">
            <input className="m-r" id="searchGiftext" type="search" />
            <button
              className="pa-s pointer gifSearchBar_button"
              onClick={() => {
                const searchGiftext = document.querySelector("#searchGiftext");
                setGifSearchText(searchGiftext.value);
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        )}
        <div
          className={`gifs ${
            gifsstate === "Trending"
              ? "gifs_max-height-trending"
              : "gifs_max-height-search"
          }`}
        >
          {gifsstate === "Trending" ? (
            renderGifs(gifData)
          ) : (
            <Fragment>{renderGifsSearch(gifsDataSearched)}</Fragment>
          )}
        </div>
        <div class="confirmSelectGif">
          <button
            className={`confirmSelectGif_button pointer ${
              confirmButtonstatus ? "enabled" : ""
            }`}
            onClick={() => {
              confirmButtonstatus
                ? confirmGifsAction()
                : props.setGifBoxVisible(true);
            }}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  if (props.isGifBoxLoaded && isLoadPending) {
    <div id="Gifbox" className="GifBox">
      <p class="Loading">Loading</p>
    </div>;
  }

  return (
    <div id="Gifbox">
      {/* <div className="gifs">{() => renderGifs(d)}</div>  */}
    </div>
  );
};

export default GifBox;
