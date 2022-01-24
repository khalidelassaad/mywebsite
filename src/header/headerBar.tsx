import * as React from 'react';
import HeaderButton from './headerButton';

const listClassName: string = 'headerBar-list';

interface Props {
  navButtons: [string, () => any][];
}

function HeaderBar({ navButtons }: Props) {
  return (
    <div className={listClassName}>
      {navButtons.map(([label, onClick], index) => {
        return <HeaderButton key={label} label={label} onClick={onClick} />;
      })}
    </div>
  );
}

export default HeaderBar;
