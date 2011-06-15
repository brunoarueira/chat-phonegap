package com.phonegap.chat;

import android.os.Bundle;

import com.phonegap.DroidGap;
import com.strumsoft.websocket.phonegap.WebSocketFactory;

public class App extends DroidGap {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();
			
		if (appView != null) {
			WebSocketFactory wsf = new WebSocketFactory(appView);
			appView.addJavascriptInterface(wsf,
			"WebSocketFactory");
			super.loadUrl("file:///android_asset/www/index.html");
			/*
			 * super.loadUrl("file:///android_asset/www/index.html");
			 * appView.addJavascriptInterface(new WebSocketFactory(appView),
			 * "WebSocketFactory");
			 */
		} else {
			super.loadUrl("file:///android_asset/www/error.html");
		}
	}
}