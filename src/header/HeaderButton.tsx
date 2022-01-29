import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderHoverMenu } from './HeaderHoverMenu';

const buttonClassNameBase: string = 'headerBar-button';

interface HeaderButtonProps {
  label: string;
  linkTo: string;
  hoverMenuButtonPropsList?: HeaderButtonProps[];
  classNameSuffix?: string;
}

function HeaderButton(props: HeaderButtonProps) {
  const navigate = useNavigate();
  const buttonClassName = props.classNameSuffix
    ? buttonClassNameBase + '-' + props.classNameSuffix
    : buttonClassNameBase;

  if (props.hoverMenuButtonPropsList == undefined) {
    return (
      <div
        className={buttonClassName}
        onClick={() => {
          navigate(props.linkTo);
        }}
      >
        {props.label}
      </div>
    );
  }

  const [isMouseHover, setIsMouseHover] = React.useState(false);

  const askHoverMenuToOpen = () => {
    setIsMouseHover(true);
  };
  const askHoverMenuToClose = () => {
    setIsMouseHover(false);
  };

  return (
    <div
      className={buttonClassName}
      onClick={() => {
        navigate(props.linkTo);
        askHoverMenuToClose();
      }}
      onMouseEnter={askHoverMenuToOpen}
      onMouseLeave={askHoverMenuToClose}
    >
      {props.label}
      <HeaderHoverMenu
        childButtonPropsList={props.hoverMenuButtonPropsList}
        mouseIsOverParent={isMouseHover}
        triggerCloseMenu={() => {
          askHoverMenuToClose();
        }}
      />
    </div>
  );
}

export { HeaderButton, HeaderButtonProps };
