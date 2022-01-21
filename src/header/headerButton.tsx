import * as React from 'react';

const buttonClassName: string = 'headerBar-button';

interface Props {
  label: string;
  onClick: () => any;
}

function HeaderButton({ label, onClick }: Props) {
  return (
    <div className={buttonClassName} onClick={onClick}>
      {label}
    </div>
  );
}

export default HeaderButton;
