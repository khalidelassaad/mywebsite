import * as React from 'react';
import { HeaderButtonProps } from './HeaderButton';

const hoverMenuClassName: string = 'HoverMenu';

interface HeaderHoverMenuProps {
  childButtonPropsList: HeaderButtonProps[];
  mouseIsOverParent: boolean;
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
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      YAY
    </div>
  ) : (
    <></>
  );
}

export { HeaderHoverMenu, HeaderHoverMenuProps };
