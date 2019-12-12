import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class Navbar extends Component {
  static defaultProps = {
    title: 'Github Finder',
    icon: ['fab', 'github']
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    return (
      <div className='navbar bg-primary'>
        <h1>
          <FontAwesomeIcon icon={this.props.icon} /> {this.props.title}
        </h1>
      </div>
    );
  }
}

export default Navbar;
