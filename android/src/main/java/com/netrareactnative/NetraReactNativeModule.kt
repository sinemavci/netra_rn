package com.netrareactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class NetraReactNativeModule(reactContext: ReactApplicationContext) :
  NativeNetraReactNativeSpec(reactContext) {

  override fun get(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun post(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun put(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun patch(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun delete(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  companion object {
    const val NAME = NativeNetraReactNativeSpec.NAME
  }
}
