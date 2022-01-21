import * as React from 'react';
import HeaderButton from './headerButton';

const listItemClassName: string = 'headerBar-listItem';
const listClassName: string = 'headerBar-list';

interface Props {
  labels: string[];
  onClicks: (() => any)[];
}

function HeaderBar({ labels, onClicks }: Props) {
  return (
    <ul className={listClassName}>
      {labels.map((label, index) => {
        return (
          <li key={label} className={listItemClassName}>
            <HeaderButton key={label} label={label} onClick={onClicks[index]} />
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderBar;
