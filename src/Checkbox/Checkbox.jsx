import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./Checkbox.scss');

function isStringAndColorValue(str) {
  return (typeof str === 'string' || str instanceof String) && str.match(/^#(([a-fA-F]|\w){3}|([a-fA-F]|\w){6})$/gi);
}

class Checkbox extends Component {
  static _defaultColor = '#4A4A4A';

  static propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    size: PropTypes.oneOf([1, 2, 3]),
    tickSize: PropTypes.oneOf([1, 2, 3]),
    borderThickness: PropTypes.oneOf([1, 2, 3, 4]),
    className: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    id: '',
    checked: false,
    color: '#4A4A4A',
    size: 1,
    tickSize: 2,
    borderThickness: 3,
    className: '',
    onChange: () => { },
  }

  constructor(props) {
    super(props);

    const backgroundColor = isStringAndColorValue(props.color)
      ? props.color
      : isStringAndColorValue(props.color.backgroundColor)
        ? props.color.backgroundColor
        : Checkbox._defaultColor;
    const borderColor = isStringAndColorValue(props.color)
      ? props.color
      : isStringAndColorValue(props.color.borderColor)
        ? props.color.borderColor
        : Checkbox._defaultColor;
    const uncheckedBorderColor = isStringAndColorValue(props.color)
      ? props.color
      : isStringAndColorValue(props.color.uncheckedBorderColor)
        ? props.color.uncheckedBorderColor
        : Checkbox._defaultColor;
    const tickColor = isStringAndColorValue(props.color)
      ? props.color
      : isStringAndColorValue(props.color.tickColor)
        ? props.color.tickColor
        : '#FFFFFF';

    this.state = {
      checked: props.checked,
      colors: {
        backgroundColor,
        borderColor,
        uncheckedBorderColor,
        tickColor,
      },
    };

    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({
        ...this.state,
        checked: nextProps.checked,
      });
    }
  }

  handleClickCheckbox() {
    const newValue = !this.state.checked;

    this.setState({
      ...this.state,
      checked: newValue,
    });

    this.props.onChange(newValue);
  }


  render() {
    const classes = ['Checkbox'];
    classes.push(this.props.className);
    classes.push(this.state.checked ? 'checked' : 'unchecked');

    const scale = 0.25 + (0.25 * this.props.size);

    const id = this.props.id !== '' ? { id: this.props.id } : {};

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
            fill={this.state.colors.backgroundColor}
            stroke={this.state.checked ? this.state.colors.borderColor : this.state.colors.uncheckedBorderColor}
            strokeWidth={`${this.props.borderThickness}px`}
          />
          <path
            className="tick"
            d="M6,6 v8 h16"
            strokeWidth={this.props.tickSize}
            stroke={this.state.colors.tickColor}
            fill="none"
            transform="rotate(-45, 12, 12)"
          />
        </svg>
      </div>
    );
  }
}


export default Checkbox;
