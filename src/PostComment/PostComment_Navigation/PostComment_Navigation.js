/*Use 
  Props: 
    nav_items={[
            {
              classes: {
                span: [], -- Array of strings
                i: ["fa-pen", "m-sr"],
              },
              text: "Compose Post",
              onClick: ()=>{** Click function **}
            },
          ]}
          crossOnClick={() => props.setPostComment_Overlay_status("")}

*/

import "../PostComment.scss";
import "./PostComment_Navigation.scss";

function PostComment_Navigation(props) {
  const convertclassToString = (arr) => {
    const str = arr.join(" ");

    return str;
  };

  const spanArray = props.nav_items.map((nav_item) => {
    return (
      <span
        id={nav_item.id}
        className={`Compose_Post pointer ${convertclassToString(
          nav_item.classes.span
        )}`}
        onClick={nav_item.onClick || function () {}}
      >
        <i className={`fas ${convertclassToString(nav_item.classes.i)}`}></i>
        {nav_item.text}
      </span>
    );
  });

  return (
    <nav className="Navigation">
      {spanArray}
      <span className="cross pa-s light-grey" onClick={props.crossOnClick}>
        <i className="fas fa-times"></i>
      </span>
    </nav>
  );
}

export default PostComment_Navigation;
