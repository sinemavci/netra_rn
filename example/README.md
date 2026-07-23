# Netra React Native

Advanced networking SDK for React Native applications with offline support, slow network strategies, request lifecycle monitoring and streaming capabilities.

Netra provides a modern TypeScript API while leveraging native networking capabilities underneath.

## Features

- 🚀 HTTP methods: GET, POST, PUT, PATCH, DELETE
- 📦 Offline request queue
- 🔄 Automatic retry strategies
- 🐌 Slow network handling
- ⚡ Request lifecycle observers
- 💾 Smart caching support
- 🌊 Streaming response support
- 📤 Multipart upload support
- 🔌 Native Android/iOS networking layer
- 🧩 Multiple converter support
- 🔒 Type-safe TypeScript API

---

## Installation

```bash
npm install netra-react-native
```

or

```bash
yarn add netra-react-native
```

---

## Basic Usage

```typescript
import {
  NetraClient,
  RequestOptions,
  ConverterType,
} from 'netra-react-native';


const client = new NetraClient({
  baseUrl: 'https://api.example.com',
  converterType: ConverterType.KOTLINX,
});


const response = await client.get(
  new RequestOptions({
    url: '/users',
  })
);

console.log(response.data);
```

---

# Offline Request Queue

Netra can automatically queue requests when the device is offline.

```typescript
const response = await client.post(
  new RequestOptions({
    url: '/messages',

    body: RequestBody.createJson(
      JSON.stringify({
        message: 'Hello',
      })
    ),

    offlinePolicyAction:
      OfflinePolicyAction.queue(),
  })
);
```

When the network becomes available, queued requests can be restored and executed automatically.

---

# Retry Strategy

Netra supports configurable retry policies for unreliable networks.

```typescript
offlinePolicyAction:
  OfflinePolicyAction.retry(
    3,
    Duration.seconds(4)
  )
```

Example flow:

```
Request
   |
Failure
   |
Wait 4 seconds
   |
Retry
   |
Retry again
```

---

# Slow Network Handling

Netra provides strategies for slow or unstable connections.

```typescript
slowNetworkPolicyAction:
  SlowNetworkPolicyAction.wait(
    Duration.seconds(5)
  )
```

Available strategies:

```typescript
SlowNetworkPolicyAction.wait()

SlowNetworkPolicyAction.timeout()

SlowNetworkPolicyAction.useCache()
```

---

# Request Lifecycle Observers

Monitor request lifecycle events.

```typescript
client.on(
  'RequestSuccess',
  ({ request, response }) => {

    console.log(
      request.url,
      response.statusCode
    );

  }
);
```

Supported events:

| Event | Description |
|---|---|
| RequestExecuted | Request execution started |
| RequestSuccess | Request completed successfully |
| RequestFailed | Request failed |
| RequestQueued | Request added to offline queue |
| QueuedRequestSuccess | Queued request executed successfully |

---

# Streaming

Netra supports streaming responses for large payloads.

```typescript
const options = new RequestOptions({
  url: '/large-file',
});


for await (
  const chunk of client.getStream(options)
) {

  console.log(chunk.length);

}
```

Useful for:

- Large files
- Images
- Media content
- Progressive downloads

---

# Multipart Upload

Upload files using multipart requests.

```typescript
const options = new RequestOptions({

  url: '/upload',

  body: RequestBody.multipart([

    RequestBodyPart.file(
      'image',
      'photo.jpg',
      bytes,
      'image/jpeg'
    )

  ])

});


await client.post(options);
```

---

# Converter Support

Netra supports multiple serialization converters.

Available converters:

- Kotlinx Serialization
- Gson
- Moshi

Example:

```typescript
const client = new NetraClient({

  baseUrl: 'https://api.example.com',

  converterType:
    ConverterType.MOSHI,

});
```

---

# Multiple Client Support

You can create multiple clients with different configurations.

```typescript
const githubClient = new NetraClient({

  baseUrl:
    'https://api.github.com',

  converterType:
    ConverterType.GSON,

});


const apiClient = new NetraClient({

  baseUrl:
    'https://api.example.com',

  converterType:
    ConverterType.KOTLINX,

});
```

---

# Example Application

The example project demonstrates:

- GitHub API integration
- CRUD operations
- Offline request queue
- Retry policies
- Slow network handling
- Request observers
- Streaming image download
- Multipart image upload
- Multiple converter usage

---

# Architecture

Netra React Native provides:

```
React Native App
        |
        |
 TypeScript API
        |
        |
 Native Bridge
        |
        |
 Native Networking Layer
        |
        |
 Android / iOS
```

The JavaScript layer provides a clean developer experience while networking operations are handled through native implementations.

---

# License

MIT License