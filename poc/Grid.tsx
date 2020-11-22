import React, {useMemo} from 'react';
import {range} from '../src/utils';
import {
  Text,
  View,
  useTVEventHandler,
  Platform,
  PlatformOSType,
} from 'react-native';

import {
  MainFocusController,
  FocusableLayer,
  Focusable,
} from 'react-native-focus-kit';
import {useEmitter} from '../src/hooks/useEmitter';
import {ArrowKey, ArrowKeyEvent} from 'react-native-focus-kit';

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
  return (
    <MainFocusController arrowKeyEventEmitter={arrowEmitter}>
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
            focusedStyle={{backgroundColor: 'cyan'}}>
            <View>
              <Text>Focusable {i}</Text>
            </View>
          </Focusable>
        ))}
      </FocusableLayer>
    </MainFocusController>
  );
};
