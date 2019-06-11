import React, { Component } from 'react';
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


class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    size: PropTypes.oneOf([1, 2, 3]),
    tickSize: PropTypes.oneOf([1, 2, 3]),
    borderThickness: PropTypes.oneOf([1, 2, 3, 4]),
    className: PropTypes.string,
    delay: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    id: '',
    checked: false,
    color: {},
    size: 1,
    tickSize: 2,
    borderThickness: 3,
    className: '',
    delay: 0,
    onChange: () => {},
  }


  handleClickCheckbox = () => {
    this.props.onChange(!this.props.checked);
  }


  render() {
    const classes = ['Checkbox'];
    classes.push(this.props.className);
    classes.push(this.props.checked ? 'checked' : 'unchecked');

    const scale = 0.25 + (0.25 * this.props.size);
    const id = this.props.id !== '' ? { id: this.props.id } : {};
    const colors = getColors(this.props.color);
    const tickTransitionDelay = this.props.checked
      ? 120 + this.props.delay
      : this.props.delay;
    const squareTransitionDelay = this.props.checked
      ? this.props.delay
      : 600 + this.props.delay;

    return (
      <div
        className={classes.join(' ')}
        role="checkbox"
        aria-checked="false"
        tabIndex="0"
        onClick={this.handleClickCheckbox}
        onKeyPress={this.handleClickCheckbox}
      >
        <input {...id} type="checkbox" style={{ display: 'none' }} />
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
            stroke={this.props.checked
              ? colors.borderColor
              : colors.uncheckedBorderColor}
            strokeWidth={`${this.props.borderThickness}px`}
            style={{
              transitionDelay: `${squareTransitionDelay}ms`,
            }}
          />
          <path
            className="tick"
            d="M6,6 v8 h16"
            strokeWidth={this.props.tickSize}
            stroke={colors.tickColor}
            fill="none"
            transform="rotate(-45, 12, 12)"
            style={{
              transitionDelay: `${tickTransitionDelay}ms`,
            }}
          />
        </svg>
      </div>
    );
  }
}


export default Checkbox;
