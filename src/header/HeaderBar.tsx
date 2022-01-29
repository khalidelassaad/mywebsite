import * as React from 'react';
import { HeaderButton, HeaderButtonProps } from './HeaderButton';

const listClassName: string = 'headerBar-list';

interface Props {
  navButtons: [string, string, HeaderButtonProps[]?][];
}

function HeaderBar({ navButtons }: Props) {
  return (
    <div className={listClassName}>
      {navButtons.map(([label, linkTo, hoverMenuButtonPropsList]) => {
        return (
          <HeaderButton
            key={label}
            label={label}
            linkTo={linkTo}
            hoverMenuButtonPropsList={hoverMenuButtonPropsList}
          />
        );
      })}
    </div>
  );
}

export default HeaderBar;
