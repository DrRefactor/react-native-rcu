import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

const style: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 1,
  height: 1,
};
export default function FocusTrap() {
  return <TouchableOpacity style={style} onPress={() => {}} />;
}
