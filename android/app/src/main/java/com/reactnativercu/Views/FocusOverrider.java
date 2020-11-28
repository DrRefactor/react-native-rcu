package com.reactnativercu.Views;

import android.view.View;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.views.view.ReactViewGroup;

public class FocusOverrider extends ViewGroupManager<FocusOverriderView> {

    public static final String REACT_CLASS = "FocusOverrider";
    ReactApplicationContext mCallerContext;

    public FocusOverrider(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public FocusOverriderView createViewInstance(ThemedReactContext context) {
        return new FocusOverriderView(context);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return super.needsCustomLayoutForChildren();
    }
}
