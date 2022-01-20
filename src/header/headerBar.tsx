import * as React from "react";
import HeaderButton from "./headerButton";

interface Props {
  labels: string[];
  onClicks: (() => any)[];
}

function HeaderBar({ labels, onClicks }: Props) {
  return (
    <ol>
      {labels.map((label, index) => {
        <li>
          <HeaderButton key={index} label={label} onClick={onClicks[index]} />
        </li>;
      })}
    </ol>
  );
}

export default HeaderBar;
