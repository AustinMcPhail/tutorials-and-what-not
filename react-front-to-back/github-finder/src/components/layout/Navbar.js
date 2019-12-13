import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <FontAwesomeIcon icon={icon} /> {title}
      </h1>
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
