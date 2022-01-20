import * as React from 'react';

interface Props {
    label: string
}

function HeaderButton({ label }: Props) {
  return (
    <button className="App-button" type="button">
      {label}
    </button>
  );
}

export default HeaderButton;
