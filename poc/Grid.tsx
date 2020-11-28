import React, {useMemo, useRef} from 'react';
import {range} from '../src/utils';
import {
  Text,
  View,
  useTVEventHandler,
  Platform,
  PlatformOSType,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  MainFocusController,
  FocusableLayer,
  Focusable,
} from 'react-native-focus-kit';
import {useEmitter} from '../src/hooks/useEmitter';
import {ArrowKey, ArrowKeyEvent} from 'react-native-focus-kit';
import {useFunction} from '../src/hooks/useFunction';
import ImperativeScrollView, {
  ImperativeScrollViewInterface,
} from '../src/ImperativeScrollView';

type EmitterPayload = {
  [ArrowKeyEvent.Press]: ArrowKey;
};

const defaultKeyMap: Record<string, ArrowKey> = {
  up: ArrowKey.ArrowUp,
  down: ArrowKey.ArrowDown,
  left: ArrowKey.ArrowLeft,
  right: ArrowKey.ArrowRight,
};

enum AndroidKeyAction {
  KeyDown = 0,
  KeyUp = 1,
}

const focusAction: Record<PlatformOSType, unknown> = {
  ios: undefined,
  android: AndroidKeyAction.KeyDown,

  macos: undefined,
  web: undefined,
  windows: undefined,
};

function isFocusAction(action?: number) {
  return focusAction[Platform.OS] === action;
}

function useArrowEmitter() {
  const emitter = useEmitter<ArrowKeyEvent.Press, EmitterPayload>();

  useTVEventHandler((event) => {
    if (['up', 'down', 'right', 'left'].includes(event.eventType)) {
      console.log('ARROW EVENT', event.eventType, event.eventKeyAction);
    }
    const mappedKey = defaultKeyMap[event.eventType];
    if (mappedKey && isFocusAction(event.eventKeyAction)) {
      emitter.emit(ArrowKeyEvent.Press, mappedKey);
    }
  });

  return useMemo(
    () => ({
      on: emitter.on,
      off: emitter.off,
    }),
    [emitter.off, emitter.on],
  );
}

export const SimpleGrid: React.FC = () => {
  const arrowEmitter = useArrowEmitter();
  const scrollViewRef = useRef<ImperativeScrollViewInterface>(null);

  const onFocus = useFunction(async (view?: View | null) => {
    if (!view || !scrollViewRef.current) {
      return;
    }
    scrollViewRef.current.scrollToView(view);
  });
  return (
    <MainFocusController arrowKeyEventEmitter={arrowEmitter}>
      <ImperativeScrollView
        ref={scrollViewRef}
        style={{
          height: Dimensions.get('window').height,
      }}>
        <FocusableLayer
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {range(50).map((i) => (
            <Focusable
              style={{
                borderWidth: 1,
                borderColor: 'cyan',
                borderRadius: 40,
                borderStyle: 'solid',
                width: 250,
                height: 250,
                margin: 25,
              }}
              key={i}
              focusedStyle={{backgroundColor: 'cyan'}}
              onFocus={onFocus}>
              <Text>Focusable {i}</Text>
              <TouchableOpacity
                style={{backgroundColor: 'red', width: 50, height: 50}}
              />
            </Focusable>
          ))}
        </FocusableLayer>
      </ImperativeScrollView>
    </MainFocusController>
  );
};
