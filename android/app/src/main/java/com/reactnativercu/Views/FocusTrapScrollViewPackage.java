package com.reactnativercu.Views;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class FocusTrapScrollViewPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactApplicationContext) {
        ArrayList<ViewManager> viewManagers = new ArrayList<ViewManager>();
        viewManagers.add(new FocusTrapScrollViewManager());
        return viewManagers;
    }
}
