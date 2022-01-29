import * as React from 'react';
import { HeaderButton, HeaderButtonProps } from './HeaderButton';

const hoverMenuClassName: string = 'HoverMenu';
const hoverMenuButtonClassSuffix: string = 'hoverMenu';

interface HeaderHoverMenuProps {
  childButtonPropsList: HeaderButtonProps[];
  mouseIsOverParent: boolean;
  triggerCloseMenu;
}

function HeaderHoverMenu(props: HeaderHoverMenuProps) {
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const onMouseOver = () => {
    setIsMouseOver(true);
  };
  const onMouseOut = () => {
    setIsMouseOver(false);
  };

  return props.mouseIsOverParent || isMouseOver ? (
    <div
      className={hoverMenuClassName}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOut}
      onClick={(event) => {
        event.stopPropagation();
        onMouseOut();
        props.triggerCloseMenu();
      }}
    >
      {props.childButtonPropsList.map((childButtonProps) => {
        return (
          <HeaderButton
            {...childButtonProps}
            key={childButtonProps.label}
            classNameSuffix={hoverMenuButtonClassSuffix}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
}

export { HeaderHoverMenu, HeaderHoverMenuProps };
