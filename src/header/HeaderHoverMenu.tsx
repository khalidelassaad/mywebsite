import * as React from 'react';
import { HeaderButtonProps } from './HeaderButton';

interface HeaderHoverMenuProps {
  childButtonPropsList: HeaderButtonProps[];
  visible: boolean;
}

function HeaderHoverMenu(props: HeaderHoverMenuProps) {
  return props.visible ? <div>YAY</div> : <></>;
}

export { HeaderHoverMenu, HeaderHoverMenuProps };
