import {AppRegistry} from 'react-native';
import App from './src/App';
import React from 'react';
window.React = React;

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root'),
});
