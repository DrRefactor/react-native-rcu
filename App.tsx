/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Platform, StatusBar, View} from 'react-native';

import {SimpleGrid} from './poc/Grid';
import DPadOverrider from './src/DPadOverrider';
import FocusTrap from './src/FocusTrap';
declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <DPadOverrider>
      {!Platform.isTV && <StatusBar barStyle="dark-content" />}
      <View collapsable={false}>
        <FocusTrap />
        <SimpleGrid />
      </View>
    </DPadOverrider>
  );
};

export default App;
