import React from 'react';
import {requireNativeComponent} from 'react-native';

const FocusTrapScrollView = requireNativeComponent('FocusTrapScrollView');

export default function DPadOverrider({children}: {children: React.ReactNode}) {
  return <FocusTrapScrollView>{children}</FocusTrapScrollView>;
}
