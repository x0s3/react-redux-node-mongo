import React from 'react';
import {IndexLink, Link} from 'react-router';
import PropTypes from 'prop-types';
import './PageLayout.scss';
import {Menu} from 'semantic-ui-react'


export const PageLayout = ({children}) => (
  <div>
    <Menu fluid widths={3}>
      <Menu.Item name="Users">
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
      </Menu.Item>
      <Menu.Item name="Users"><Link to="/users" activeClassName='page-layout__nav-item--active'>Users</Link></Menu.Item>
    </Menu>
    {children}
  </div>
);
PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
