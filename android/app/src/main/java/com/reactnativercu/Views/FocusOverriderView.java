package com.reactnativercu.Views;

import android.graphics.Color;
import android.util.AttributeSet;
import android.view.FocusFinder;
import android.view.View;
import android.widget.RelativeLayout;

import com.facebook.react.uimanager.ThemedReactContext;

public class FocusOverriderView extends RelativeLayout {
    public FocusOverriderView(final ThemedReactContext context) {
        super(context);
        this.setFocusableInTouchMode(true);
        this.setFocusable(true);
        this.requestFocus();
        this.setBackgroundColor(Color.CYAN);
        this.setMinimumWidth(50);
        this.setMinimumHeight(50);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);
        this.requestFocus();
        this.getParent().requestChildFocus(this, this);
        System.out.println("DUPA" + this.isFocused());
    }

    @Override
    public View focusSearch(View focused, int direction) {
//        if (hasFocus() && direction != FOCUS_RIGHT) {
//            // If we have focus, we should only relinquish focus if it is moving to the right.
//            // Otherwise we restrict the focus search to our children.
//            return FocusFinder.getInstance().findNextFocus(this, focused, direction);
//        } else {
//            return super.focusSearch(focused, direction);
//        }
        return this;
    }

    @Override
    public View findFocus() {
        return this;
    }
}
