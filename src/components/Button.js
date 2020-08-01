import React from "react";

function Button(props) {
  return (
    <button className={'btn btn-dark'} onClick={props.clickHandler.bind(null, props.link)}>
      {props.value}
    </button>
  );
}

export default Button;
