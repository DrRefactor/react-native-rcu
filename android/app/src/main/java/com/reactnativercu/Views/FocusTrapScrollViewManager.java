package com.reactnativercu.Views;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class FocusTrapScrollViewManager extends ViewGroupManager<FocusTrapScrollView> {
    @Override
    public String getName() {
        return "FocusTrapScrollView";
    }

    @Override
    public FocusTrapScrollView createViewInstance(ThemedReactContext context) {
        return new FocusTrapScrollView(context);
    }
}
