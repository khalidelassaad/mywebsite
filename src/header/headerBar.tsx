import * as React from 'react';
import HeaderButton from './headerButton';

interface Props {
  labels: string[];
  onClicks: (() => any)[];
}

function HeaderBar({ labels, onClicks }: Props) {
  return (
    <ul>
      {labels.map((label, index) => {
        return (
          <li key={label}>
            <HeaderButton key={label} label={label} onClick={onClicks[index]} />
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderBar;
