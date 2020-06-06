import React from 'react';
import {StatusBar} from 'react-native';

import Dashboard from './containers/Dashboard';

const Twitch = () => {
  return (
    <>
      <StatusBar hidden />
      <Dashboard />
    </>
  );
};

export default Twitch;
