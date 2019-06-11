import React from 'react';
import PropTypes from 'prop-types';

require('./Checkbox.scss');

const defaultColor = '#4A4A4A';

function isStringAndColorValue(str) {
  return (typeof str === 'string' || str instanceof String) && str.match(/^#(([a-fA-F]|\w){3}|([a-fA-F]|\w){6})$/gi);
}

function getColors(propsColor) {
  const colors = {};
  const isPropsColor = isStringAndColorValue(propsColor);

  colors.backgroundColor = isPropsColor ? propsColor : defaultColor;
  if (!isPropsColor && isStringAndColorValue(propsColor.backgroundColor)) {
    colors.backgroundColor = propsColor.backgroundColor;
  }

  colors.borderColor = isPropsColor ? propsColor : defaultColor;
  if (!isPropsColor && isStringAndColorValue(propsColor.borderColor)) {
    colors.borderColor = propsColor.borderColor;
  }

  colors.uncheckedBorderColor = isPropsColor ? propsColor : defaultColor;
  if (!isPropsColor && isStringAndColorValue(propsColor.uncheckedBorderColor)) {
    colors.uncheckedBorderColor = propsColor.uncheckedBorderColor;
  }

  colors.tickColor = isStringAndColorValue(propsColor.tickColor)
    ? propsColor.tickColor
    : '#FFFFFF';

  return colors;
}


const Checkbox = ({
  backAnimationDuration,
  borderThickness,
  checked,
  className,
  color,
  delay,
  id,
  onChange,
  size,
  tickAnimationDuration,
  tickSize,
}) => {
  const classes = ['Checkbox'];
  classes.push(className);
  classes.push(checked ? 'checked' : 'unchecked');

  const scale = 0.25 + (0.25 * size);
  const attrId = id !== '' ? { id } : {};
  const colors = getColors(color);
  const tickTransitionDelay = checked
    ? 120 + delay
    : delay;
  const squareTransitionDelay = checked
    ? delay
    : 600 + delay;

  return (
    <div
      className={classes.join(' ')}
      role="checkbox"
      aria-checked="false"
      tabIndex="0"
      onClick={() => { onChange(!checked); }}
      onKeyPress={() => { onChange(!checked); }}
    >
      <input {...attrId} type="checkbox" style={{ display: 'none' }} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        transform={`scale(${scale})`}
      >
        <rect
          className="square"
          x="2"
          y="2"
          width="20"
          height="20"
          rx="2"
          ry="2"
          fill={colors.backgroundColor}
          stroke={checked
            ? colors.borderColor
            : colors.uncheckedBorderColor}
          strokeWidth={`${borderThickness}px`}
          style={{
            transitionDelay: `${squareTransitionDelay}ms`,
            transitionDuration: `${backAnimationDuration}ms`,
          }}
        />
        <path
          className="tick"
          d="M6,6 v8 h16"
          strokeWidth={tickSize}
          stroke={colors.tickColor}
          fill="none"
          transform="rotate(-45, 12, 12)"
          style={{
            transitionDelay: `${tickTransitionDelay}ms`,
            transitionDuration: `${tickAnimationDuration}ms`,
          }}
        />
      </svg>
    </div>
  );
};

Checkbox.propTypes = {
  backAnimationDuration: PropTypes.number,
  borderThickness: PropTypes.oneOf([1, 2, 3, 4]),
  checked: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  delay: PropTypes.number,
  id: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([1, 2, 3]),
  tickAnimationDuration: PropTypes.number,
  tickSize: PropTypes.oneOf([1, 2, 3]),
};

Checkbox.defaultProps = {
  backAnimationDuration: 180,
  borderThickness: 3,
  checked: false,
  className: '',
  color: {},
  delay: 0,
  id: '',
  onChange: () => {},
  size: 1,
  tickAnimationDuration: 500,
  tickSize: 2,
};


export default Checkbox;
