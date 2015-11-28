import React, { PropTypes, Component } from 'react';


export default class Conditional extends Component {
  static propTypes = {
    condition: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    children: PropTypes.element.isRequired,
  };

  render() {
    let render = this.props.condition;
    if(typeof this.props.condition === 'function') {
      render = this.props.condition();
    }
    if(render) {
      return <div>{this.props.children}</div>;
    }
    return null;
  }
}
