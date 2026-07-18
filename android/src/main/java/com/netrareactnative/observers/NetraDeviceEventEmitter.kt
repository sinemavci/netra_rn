package com.netrareactnative.observers

import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

object NetraDeviceEventEmitter {

  fun sendEvent(reactContext: ReactContext, eventName: String, params: Any?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }
}
