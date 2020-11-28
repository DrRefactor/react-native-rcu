import {requireNativeComponent, View, ViewStyle} from 'react-native';
import React from 'react';

const FocusOverriderView = requireNativeComponent(
  'FocusOverrider',
) as typeof View;

const style: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 1,
  height: 1,
};
export default function FocusTrap() {
  return <FocusOverriderView style={style} />;
}
