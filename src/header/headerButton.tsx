import * as React from 'react';

const buttonClassName: string = 'headerBar-button';

interface Props {
  label: string;
  onClick: () => any;
}

function HeaderButton({ label, onClick }: Props) {
  return (
    <button className={buttonClassName} type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default HeaderButton;
