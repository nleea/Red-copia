import React from "react";
import './Button.css';

export const Button: React.FC<{ options: any; submit?: () => void }> = (
  props
) => {
  return (
    <>
      <button {...props.options} onClick={props.submit}>
        {props.children}
      </button>
    </>
  );
};
