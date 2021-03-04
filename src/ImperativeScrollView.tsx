import React, {useImperativeHandle, useRef} from 'react';
import {
  Animated,
  Easing,
  findNodeHandle,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {useFunction} from './hooks/useFunction';

function measureLayout(
  view: View,
  relativeTo: ScrollView | View,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const scrollViewNodeHandle = findNodeHandle(relativeTo);
    if (scrollViewNodeHandle == null) {
      reject();
      return;
    }
    view.measureLayout(scrollViewNodeHandle, (_, top) => resolve(top), reject);
  });
}

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type ImperativeScrollViewInterface = {
  scrollToView: (view: View) => void;
};

function useAnimateTo(value: Animated.Value) {
  const animateTo = useFunction((to: number) => {
    const animation = Animated.timing(value, {
      toValue: to,
      useNativeDriver: true,
      duration: 500,
      easing: Easing.inOut(Easing.sin),
    });
    animation.start();
    // value.setValue(to);
  });

  return {
    animateTo,
  };
}

const ImperativeScrollView = (
  props: Props,
  ref: React.Ref<ImperativeScrollViewInterface>,
) => {
  const scrollPosition = useRef(new Animated.Value(0));
  const {animateTo} = useAnimateTo(scrollPosition.current);

  const containerRef = useRef<View>(null);

  const scrollToView = useFunction(async (view?: View | null) => {
    if (!view || !containerRef.current) {
      return;
    }
    const position = await measureLayout(view, containerRef.current);

    animateTo(-position);
  });

  useImperativeHandle(
    ref,
    () => ({
      scrollToView,
    }),
    [scrollToView],
  );

  return (
    <View
      collapsable={false}
      style={[
        {
          overflow: 'hidden',
        },
        props.style,
      ]}>
      <Animated.View
        ref={containerRef}
        style={{
          transform: [
            {translateY: scrollPosition.current},
            {perspective: 1000},
          ],
          flexGrow: 1,
          position: 'absolute'
        }}
        collapsable={false}>
        {props.children}
      </Animated.View>
    </View>
  );
};

export default React.forwardRef<ImperativeScrollViewInterface, Props>(
  ImperativeScrollView,
);
