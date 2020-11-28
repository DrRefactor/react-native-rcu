package com.reactnativercu.Views;

import android.content.Context;
import android.view.KeyEvent;
import android.widget.ScrollView;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class FocusTrapScrollView extends ReactScrollView {
    public FocusTrapScrollView(ReactContext context) {
        super(context);
    }

    private static Set<Integer> overridenKeys = new HashSet<>(
            Arrays.asList(
                    KeyEvent.KEYCODE_DPAD_UP,
                    KeyEvent.KEYCODE_DPAD_DOWN,
                    KeyEvent.KEYCODE_DPAD_LEFT,
                    KeyEvent.KEYCODE_DPAD_RIGHT
//                    KeyEvent.KEYCODE_DPAD_UP_LEFT,
//                    KeyEvent.KEYCODE_DPAD_UP_RIGHT,
//                    KeyEvent.KEYCODE_DPAD_DOWN_LEFT,
//                    KeyEvent.KEYCODE_DPAD_DOWN_RIGHT
            )
    );

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        return overridenKeys.contains(event.getKeyCode());
    }
}
