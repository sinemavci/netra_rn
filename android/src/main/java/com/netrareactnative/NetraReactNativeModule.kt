package com.netrareactnative

import android.Manifest
import androidx.annotation.RequiresPermission
import com.example.netra_flutter.dto.CircuitBreakerOptionsDTO
import com.example.netra_flutter.dto.RequestOptionsDTO
import com.example.netra_flutter.dto.ResponseDTO
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.netra.library.Cache
import com.netra.library.NetraClient
import com.netra.library.NetraClientList
import com.netra.library.NetraRequestBody
import com.netra.library.converter.NetraGsonConverter
import com.netra.library.converter.NetraKotlinxConverter
import com.netra.library.converter.NetraMoshiConverter
import com.netra.library.enums.OfflinePolicyAction
import com.netra.library.enums.SlowNetworkPolicyAction

class NetraReactNativeModule(val reactContext: ReactApplicationContext) :
  NativeNetraReactNativeSpec(reactContext) {

  val jsonConverter = Gson()

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun get(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    try {
      val client = NetraClientList.getClients().find { it.id == clientId }
      val requestOptionsDto = requestOptions.let {
        Gson().fromJson(it, RequestOptionsDTO::class.java)
      }
      val offlinePolicyAction: OfflinePolicyAction? =
        requestOptionsDto?.offlinePolicyAction?.toDataModel()
      val slowNetworkPolicyAction: SlowNetworkPolicyAction? =
        requestOptionsDto?.slowNetworkPolicyAction?.toDataModel()
      val cache: Cache? = requestOptionsDto?.cacheOptions?.toDataModel()
      val headers = requestOptionsDto?.headers
      val path = requestOptionsDto.url
      val cancelOnDispose = requestOptionsDto.cancelOnDispose

      if (client != null) {
        val requestBuilder =
          client.get(path).addHeaders(headers ?: emptyMap()).asObject<Any>()
        offlinePolicyAction?.let {
          requestBuilder.whenOffline(offlinePolicyAction)
        }
        slowNetworkPolicyAction?.let {
          requestBuilder.whenSlowNetwork(slowNetworkPolicyAction)
        }
        cache?.let {
          requestBuilder.withCache(it)
        }
        cancelOnDispose?.let {
          requestBuilder.cancelWhenDestroyed()
        }
        requestBuilder.enqueue { response, exception ->
          if (response != null) {
            promise?.resolve(
              jsonConverter.toJson(
                ResponseDTO.fromDataModel(
                  response
                )
              )
            )
          } else if (exception != null) {
            promise?.reject(exception)
          }
        }
      } else {
        promise?.reject(Exception("Client not found!"))
      }
    } catch (e: Error) {
      promise?.reject(e)
    }
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun post(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    try {
      val client = NetraClientList.getClients().find { it.id == clientId }
      val requestOptionsDto = requestOptions.let {
        Gson().fromJson(it, RequestOptionsDTO::class.java)
      }
      val requestBody = requestOptionsDto.body?.toDataModel() ?: NetraRequestBody.EMPTY
      val offlinePolicyAction: OfflinePolicyAction? =
        requestOptionsDto?.offlinePolicyAction?.toDataModel()
      val slowNetworkPolicyAction: SlowNetworkPolicyAction? =
        requestOptionsDto?.slowNetworkPolicyAction?.toDataModel()
      val cache: Cache? = requestOptionsDto?.cacheOptions?.toDataModel()
      val headers = requestOptionsDto?.headers
      val path = requestOptionsDto.url
      val cancelOnDispose = requestOptionsDto.cancelOnDispose

      if (client != null) {
        val requestBuilder =
          client.post(path, requestBody).addHeaders(headers ?: emptyMap()).asObject<Any>()
        offlinePolicyAction?.let {
          requestBuilder.whenOffline(offlinePolicyAction)
        }
        slowNetworkPolicyAction?.let {
          requestBuilder.whenSlowNetwork(slowNetworkPolicyAction)
        }
        cache?.let {
          requestBuilder.withCache(it)
        }
        cancelOnDispose?.let {
          requestBuilder.cancelWhenDestroyed()
        }
        requestBuilder.enqueue { response, exception ->
          if (response != null) {
            promise?.resolve(
              jsonConverter.toJson(
                ResponseDTO.fromDataModel(
                  response
                )
              )
            )
          } else if (exception != null) {
            promise?.reject(exception)
          }
        }
      } else {
        promise?.reject(Exception("Client not found!"))
      }
    } catch (e: Error) {
      promise?.reject(Exception(e))
    }
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun put(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    try {
      val client = NetraClientList.getClients().find { it.id == clientId }
      val requestOptionsDto = requestOptions.let {
        Gson().fromJson(it, RequestOptionsDTO::class.java)
      }
      val requestBody = requestOptionsDto.body?.toDataModel() ?: NetraRequestBody.EMPTY
      val offlinePolicyAction: OfflinePolicyAction? =
        requestOptionsDto?.offlinePolicyAction?.toDataModel()
      val slowNetworkPolicyAction: SlowNetworkPolicyAction? =
        requestOptionsDto?.slowNetworkPolicyAction?.toDataModel()
      val headers = requestOptionsDto?.headers
      val cache: Cache? = requestOptionsDto?.cacheOptions?.toDataModel()
      val path = requestOptionsDto.url
      val cancelOnDispose = requestOptionsDto.cancelOnDispose

      if (client != null) {
        val requestBuilder =
          client.put(path, requestBody).addHeaders(headers ?: emptyMap()).asObject<Any>()
        offlinePolicyAction?.let {
          requestBuilder.whenOffline(offlinePolicyAction)
        }
        slowNetworkPolicyAction?.let {
          requestBuilder.whenSlowNetwork(slowNetworkPolicyAction)
        }
        cache?.let {
          requestBuilder.withCache(it)
        }
        cancelOnDispose?.let {
          requestBuilder.cancelWhenDestroyed()
        }
        requestBuilder.enqueue { response, exception ->
          if (response != null) {
            promise?.resolve(
              jsonConverter.toJson(
                ResponseDTO.fromDataModel(
                  response
                )
              )
            )
          } else if (exception != null) {
            promise?.reject(exception)
          }
        }

      } else {
        promise?.reject(Exception("Client not found!"))
      }
    } catch (e: Error) {
      promise?.reject(Exception(e))
    }
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun patch(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    try {
      val client = NetraClientList.getClients().find { it.id == clientId }
      val requestOptionsDto = requestOptions.let {
        Gson().fromJson(it, RequestOptionsDTO::class.java)
      }
      val requestBody = requestOptionsDto.body?.toDataModel() ?: NetraRequestBody.EMPTY
      val offlinePolicyAction: OfflinePolicyAction? =
        requestOptionsDto?.offlinePolicyAction?.toDataModel()
      val slowNetworkPolicyAction: SlowNetworkPolicyAction? =
        requestOptionsDto?.slowNetworkPolicyAction?.toDataModel()
      val cache: Cache? = requestOptionsDto?.cacheOptions?.toDataModel()
      val headers = requestOptionsDto?.headers
      val path = requestOptionsDto.url
      val cancelOnDispose = requestOptionsDto.cancelOnDispose

      if (client != null) {
        val requestBuilder =
          client.patch(path, requestBody).addHeaders(headers ?: emptyMap())
            .asObject<Any>()
        offlinePolicyAction?.let {
          requestBuilder.whenOffline(offlinePolicyAction)
        }
        slowNetworkPolicyAction?.let {
          requestBuilder.whenSlowNetwork(slowNetworkPolicyAction)
        }
        cache?.let {
          requestBuilder.withCache(it)
        }
        cancelOnDispose?.let {
          requestBuilder.cancelWhenDestroyed()
        }

        requestBuilder.enqueue { response, exception ->
          if (response != null) {
            promise?.resolve(
              jsonConverter.toJson(
                ResponseDTO.fromDataModel(
                  response
                )
              )
            )

          } else if (exception != null) {
            promise?.reject(exception)
          }
        }
      } else {
        promise?.reject(Exception("Client not found!"))
      }
    } catch (e: Exception) {
      promise?.reject(Exception(e))
    }
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun delete(
    clientId: String?,
    requestOptions: String?,
    promise: Promise?
  ) {
    try {
      val client = NetraClientList.getClients().find { it.id == clientId }
      val requestOptionsDto = requestOptions.let {
        Gson().fromJson(it, RequestOptionsDTO::class.java)
      }
      val requestBody = requestOptionsDto.body?.toDataModel() ?: NetraRequestBody.EMPTY
      val offlinePolicyAction: OfflinePolicyAction? =
        requestOptionsDto?.offlinePolicyAction?.toDataModel()
      val slowNetworkPolicyAction: SlowNetworkPolicyAction? =
        requestOptionsDto?.slowNetworkPolicyAction?.toDataModel()
      val cache: Cache? = requestOptionsDto?.cacheOptions?.toDataModel()
      val headers = requestOptionsDto?.headers
      val path = requestOptionsDto.url
      val cancelOnDispose = requestOptionsDto.cancelOnDispose

      if (client != null) {
        val requestBuilder =
          client.delete(path, requestBody).addHeaders(headers ?: emptyMap())
            .asObject<Any>()
        offlinePolicyAction?.let {
          requestBuilder.whenOffline(offlinePolicyAction)
        }
        slowNetworkPolicyAction?.let {
          requestBuilder.whenSlowNetwork(slowNetworkPolicyAction)
        }
        cache?.let {
          requestBuilder.withCache(it)
        }
        cancelOnDispose?.let {
          requestBuilder.cancelWhenDestroyed()
        }
        requestBuilder.enqueue { response, exception ->
          if (response != null) {
            promise?.resolve(
              jsonConverter.toJson(
                ResponseDTO.fromDataModel(
                  response
                )
              )
            )
          } else if (exception != null) {
            promise?.reject(exception)
          }
        }

      } else {
        promise?.reject(Exception("Client not found!"))
      }
    } catch (e: Error) {
      promise?.reject(Exception(e))
    }
  }

  override fun build(
    baseUrl: String?,
    convertedType: String?,
    headers: String?,
    circuitBreakerOptions: String?,
    promise: Promise?
  ) {
    val clientBuilder: NetraClient.Builder = NetraClient.Builder(reactContext)
      .baseUrl(baseUrl!!)
    val circuitBreakerOptionsDto = circuitBreakerOptions?.let {
      Gson().fromJson(it, CircuitBreakerOptionsDTO::class.java)
    }
    circuitBreakerOptionsDto.let {
      if (it?.failureThreshold != null && it.retryDelayMs != null) {
        clientBuilder.circuitBreaker(it.failureThreshold, it.retryDelayMs)
      }
    }
    headers?.let {
      val type = object : TypeToken<Map<String, String>>() {}.type
      val headerResult: Map<String, String> = jsonConverter.fromJson(it, type)
      clientBuilder.addHeaders(headerResult)
    }
    if (convertedType !== null) {
      when (convertedType) {
        NetraMoshiConverter().type -> {
          clientBuilder.addConverterFactory(NetraMoshiConverter())
        }

        NetraGsonConverter().type -> {
          clientBuilder.addConverterFactory(NetraGsonConverter())
        }

        NetraKotlinxConverter().type -> {
          clientBuilder.addConverterFactory(NetraKotlinxConverter())
        }
      }
    }

    val client = clientBuilder.build()
    NetraClientList.add(client)
    //todo
    //clientEventHandlers[client.id] = ClientEventHandler(binaryMessenger, client.id)
    promise?.resolve(client.id)
  }

  companion object {
    const val NAME = NativeNetraReactNativeSpec.NAME
  }
}
