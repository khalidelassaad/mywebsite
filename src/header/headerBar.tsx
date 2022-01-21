import * as React from 'react';
import HeaderButton from './headerButton';

const listClassName: string = 'headerBar-list';

interface Props {
  labels: string[];
  onClicks: (() => any)[];
}

function HeaderBar({ labels, onClicks }: Props) {
  return (
    <div className={listClassName}>
      {labels.map((label, index) => {
        return (
          <HeaderButton key={label} label={label} onClick={onClicks[index]} />
        );
      })}
    </div>
  );
}

export default HeaderBar;
