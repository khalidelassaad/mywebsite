import * as React from "react";

interface Props {
  label: string;
  onClick: () => any;
}

function HeaderButton({ label, onClick }: Props) {
  return (
    <button className="App-button" type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default HeaderButton;
