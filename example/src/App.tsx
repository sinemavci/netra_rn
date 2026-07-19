import 'react-native-get-random-values';
import { View, StyleSheet, Button, Image } from 'react-native';
import {
  NetraClient,
  OfflinePolicyAction,
  RequestBody,
  RequestBodyPart,
  RequestOptions,
  SlowNetworkPolicyAction,
} from 'netra-react-native';
import { TextEncoder } from 'text-encoding';
import { encode } from 'base64-arraybuffer';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { RequestBodyPartDTO } from '../../src/internal/dto/RequestBodyPartDTO';

class Repo {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default function App() {
  const [base64, setBase64] = useState<string>();
  const client = new NetraClient({
    baseUrl: 'https://api.github.com',
    // converterType: ConverterType.GSON,
  });

  const localClient = new NetraClient({
    baseUrl: 'http://10.0.2.2:3001',
    // converterType: ConverterType.GSON,
  });

  const jsonPlaceholderClient = new NetraClient({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    // converterType: ConverterType.GSON,
  });

  return (
    <View style={styles.container}>
      <Button
        title="GET REPO"
        onPress={async () => {
          try {
            const options = new RequestOptions({
              url: '/users/octocat/repos',
              offlinePolicyAction: OfflinePolicyAction.retry(4, 4000),
              cancelOnDispose: true,
              slowNetworkPolicyAction: SlowNetworkPolicyAction.timeout(5),
            });
            const response = await client.get<Repo[]>(options);
            response?.data?.forEach((item) => {
              console.log('response.data:', item.name);
            });
            console.log('response.statusCode:', response?.statusCode);
            console.log('response.statusMessage:', response?.statusMessage);
          } catch (e) {
            console.log('error in example', e);
          }
        }}
      />
      <Button
        title="GET LOCAL"
        onPress={async () => {
          try {
            const options = new RequestOptions({
              url: '/?status=200&delay=3000',
              offlinePolicyAction: OfflinePolicyAction.retry(4, 4000),
              cancelOnDispose: true,
              slowNetworkPolicyAction: SlowNetworkPolicyAction.timeout(5),
            });
            const response = await localClient.get<Repo[]>(options);
            response?.data?.forEach((item) => {
              console.log('response.data:', item.name);
            });
            console.log('response.statusCode:', response?.statusCode);
            console.log('response.statusMessage:', response?.statusMessage);
          } catch (e) {
            console.log('error in example', e);
          }
        }}
      />
      <Button
        title="POST"
        onPress={async () => {
          try {
            const options = new RequestOptions({
              url: '/users',
              offlinePolicyAction: OfflinePolicyAction.retry(4, 4000),
              cancelOnDispose: true,
              slowNetworkPolicyAction: SlowNetworkPolicyAction.timeout(5),
              body: RequestBody.createJson(
                JSON.stringify(
                  Object.fromEntries(
                    new Map().set('name', 'Sinem').set('job', 'badeveloperr')
                  )
                )
              ),
            });
            const response = await jsonPlaceholderClient.post(options);
            console.log('response.data:', response?.data);
            console.log('response.statusCode:', response?.statusCode);
            console.log('response.statusMessage:', response?.statusMessage);
          } catch (e) {
            console.log('error', e);
          }
        }}
      />
      <Button
        title="PUT"
        onPress={async () => {
          try {
            const options = new RequestOptions({
              url: '/users/1',
              offlinePolicyAction: OfflinePolicyAction.retry(4, 4000),
              cancelOnDispose: true,
              slowNetworkPolicyAction: SlowNetworkPolicyAction.timeout(5),
              body: RequestBody.createBytes(
                new TextEncoder().encode(
                  JSON.stringify({ name: 'Sinem', job: 'mobile developer' })
                )
              ),
            });
            const response = await jsonPlaceholderClient.put(options);
            console.log('response.data:', response?.data);
            console.log('response.statusCode:', response?.statusCode);
            console.log('response.statusMessage:', response?.statusMessage);
          } catch (e) {
            console.log('error in example:', e);
          }
        }}
      />
      <Button
        title="DELETE"
        onPress={async () => {
          try {
            const options = new RequestOptions({
              url: '/users/1',
              offlinePolicyAction: OfflinePolicyAction.retry(4, 4000),
              cancelOnDispose: true,
              slowNetworkPolicyAction: SlowNetworkPolicyAction.timeout(5),
            });
            const response = await jsonPlaceholderClient.delete(options);
            console.log('response.data:', response?.data);
            console.log('response.statusCode:', response?.statusCode);
            console.log('response.statusMessage:', response?.statusMessage);
          } catch (e) {
            console.log('error', e);
          }
        }}
      />
      <Button
        title="GET IMAGE"
        onPress={async () => {
          const options = new RequestOptions({
            url: '/image',
            offlinePolicyAction: OfflinePolicyAction.retry(4, 4000),
            cancelOnDispose: true,
            slowNetworkPolicyAction: SlowNetworkPolicyAction.timeout(5),
          });
          const buffer: number[] = [];
          for await (const chunk of localClient.getStream(options)) {
            console.log('chunk in example', typeof chunk[0], chunk.length);
            buffer.push(...chunk);
          }
          console.log('stream finished', buffer.length);
          const arrayBuffer = Uint8Array.from(buffer).buffer;
          setBase64(encode(arrayBuffer));
        }}
      />
      <Button
        title="POST IMAGE"
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
          });
          if (result.didCancel || !result.assets?.[0]) return;

          const asset = result.assets[0];
          const uri = asset.uri!;
          const fileName = asset.fileName ?? 'photo.jpg';
          const type = asset.type ?? 'image/jpeg';

          const imageResponse = await fetch(uri);
          const arrayBuffer = await imageResponse.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          const options = new RequestOptions({
            url: '/upload',
            body: RequestBody.multipart([
              RequestBodyPart.file('image', fileName, bytes, type),
            ]),
            offlinePolicyAction: OfflinePolicyAction.retry(3, 4000),
            slowNetworkPolicyAction: SlowNetworkPolicyAction.wait(2000),
          });
          try {
            const response = await localClient.post(options);
            console.log('response.statusCode:', response?.statusCode);
            console.log('response.statusMessage:', response?.statusMessage);
            console.log(
              'heree: ',
              RequestBodyPartDTO.fromDataModel(
                RequestBodyPart.file('image', fileName, bytes, type)
              ).toJSONString()
            );
          } catch (e) {
            console.log('error in example: ', e);
          }
        }}
      />
      <Image
        source={{ uri: `data:image/jpeg;base64,${base64}` }}
        style={{ width: 300, height: 150 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
