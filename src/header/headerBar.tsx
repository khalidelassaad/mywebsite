import * as React from 'react';
import HeaderButton from './HeaderButton';

const listClassName: string = 'headerBar-list';

interface Props {
  navButtons: [string, string][];
}

function HeaderBar({ navButtons }: Props) {
  return (
    <div className={listClassName}>
      {navButtons.map(([label, linkTo], index) => {
        return <HeaderButton key={label} label={label} linkTo={linkTo} />;
      })}
    </div>
  );
}

export default HeaderBar;
