import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const buttonClassName: string = 'headerBar-button';

interface Props {
  label: string;
  linkTo: string;
}

function HeaderButton({ label, linkTo }: Props) {
  let navigate = useNavigate();
  return (
    <div
      className={buttonClassName}
      onClick={() => {
        navigate(linkTo);
      }}
    >
      {label}
    </div>
  );
}

export default HeaderButton;
