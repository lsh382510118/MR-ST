import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink } from 'react-router-dom';
import './index.css';

// eslint-disable-next-line react/prop-types
function BasicLayout({ children }) {
  const paths = [
    {
      name: 'Workbench',
      title: 'Homepage',
      path: '/home',
    },
    {
      name: 'Application',
      title: 'Application',
      path: '/application',
    },
    {
      name: 'Environment',
      title: 'Environment',
      path: '/environment',
    },
    {
      name: 'Setting',
      title: 'Setting',
      path: '/setting',
    },
  ];

  return (
    <>
      <header className="App-header">IWhaleCould Pay Deploay</header>
      <div className="main">
        <div className="leftBar">
          {paths.map(path => (
            <NavLink
              className="bar-item"
              to={path.path}
              activeclassname="active"
              key={path.key}
            >
              {path.name}
            </NavLink>
          ))}
        </div>
        <div className="container">{children}</div>
      </div>
    </>
  );
}

export default BasicLayout;
