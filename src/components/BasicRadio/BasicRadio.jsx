import { useEffect, useState } from "react";

function BasicRadio(props) {
  const checked =
    localStorage.getItem(`test${props.test_id}-${props.question_id}`) ==
    props.value
      ? true
      : false;

  function answerHandler(ev) {
    const name = ev.target.name;
    if (name) localStorage.setItem(name, ev.target.value);
  }

  useEffect(() => {}, []);

  return (
    <div
      key={props.keyValue}
      onClick={answerHandler}
      className="flex gap-[7px] items-center"
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        defaultChecked={checked ? true : false}
        value={props.value}
        type="radio"
        name={props.name}
        id={props.id}
      />
    </div>
  );
}

export default BasicRadio;
