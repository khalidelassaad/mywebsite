import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderHoverMenu } from './HeaderHoverMenu';

const buttonClassName: string = 'headerBar-button';

interface HeaderButtonProps {
  label: string;
  linkTo: string;
  hoverMenuButtonPropsList?: HeaderButtonProps[];
}

function HeaderButton(props: HeaderButtonProps) {
  const navigate = useNavigate();
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const onMouseOver = () => {
    setIsMouseOver(true);
  };
  const onMouseOut = () => {
    setIsMouseOver(false);
  };

  return (
    <div
      className={buttonClassName}
      onClick={() => {
        navigate(props.linkTo);
      }}
    >
      {props.label}
      {props.hoverMenuButtonPropsList == undefined ? (
        <></>
      ) : (
        <HeaderHoverMenu
          childButtonPropsList={props.hoverMenuButtonPropsList}
          visible={isMouseOver}
        />
      )}
    </div>
  );
}

export { HeaderButton, HeaderButtonProps };
