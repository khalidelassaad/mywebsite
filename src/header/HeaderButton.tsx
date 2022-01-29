import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderHoverMenu } from './HeaderHoverMenu';

const buttonClassName: string = 'headerBar-button';

interface HeaderButtonProps {
  label: string;
  linkTo: string;
  hoverMenuButtonPropsList?: HeaderButtonProps[];
  classNameSuffix?: string;
}

function HeaderButton(props: HeaderButtonProps) {
  const navigate = useNavigate();

  if (props.hoverMenuButtonPropsList == undefined) {
    return (
      <div
        className={buttonClassName}
        onClick={(event) => {
          event.stopPropagation();
          navigate(props.linkTo);
        }}
      >
        {props.label}
      </div>
    );
  }

  const [isMouseHover, setIsMouseHover] = React.useState(false);

  const onMouseEnter = () => {
    setIsMouseHover(true);
  };
  const onMouseLeave = () => {
    setIsMouseHover(false);
  };

  return (
    <div
      className={buttonClassName}
      onClick={() => {
        console.log('%s clicked', props.label);
        navigate(props.linkTo);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.label}
      <HeaderHoverMenu
        childButtonPropsList={props.hoverMenuButtonPropsList}
        mouseIsOverParent={isMouseHover}
      />
    </div>
  );
}

export { HeaderButton, HeaderButtonProps };
