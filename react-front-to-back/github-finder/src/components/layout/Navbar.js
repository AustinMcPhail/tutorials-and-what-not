import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <FontAwesomeIcon icon={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: ['fab', 'github']
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Navbar;
