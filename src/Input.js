import React from "react";
import "./App.css";

const Input = props => {
  return (
    <div className="field startform">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={event =>
            props.onChangeFromComponent &&
            props.onChangeFromComponent(event.target.value)
          }
        />
      </div>
    </div>

    
  );
}

export default Input;