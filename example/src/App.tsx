import 'react-native-get-random-values';
import { View, StyleSheet, Button } from 'react-native';
import {
  NetraClient,
  OfflinePolicyAction,
  RequestBody,
  RequestOptions,
  SlowNetworkPolicyAction,
} from 'netra-react-native';
import { TextEncoder } from 'text-encoding';

export default function App() {
  const client = new NetraClient({
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
        title="GET"
        onPress={async () => {
          const options = new RequestOptions({
            url: '/?status=200&delay=1000',
            offlinePolicyAction: OfflinePolicyAction.retry(4, 4000),
            cancelOnDispose: true,
            slowNetworkPolicyAction: SlowNetworkPolicyAction.timeout(5),
          });
          const response = await client.get(options);
          console.log('response.data:', response?.data);
          console.log('response.statusCode:', response?.statusCode);
          console.log('response.statusMessage:', response?.statusMessage);
        }}
      />
      <Button
        title="POST"
        onPress={async () => {
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
        }}
      />
      <Button
        title="PUT"
        onPress={async () => {
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
        }}
      />
      <Button
        title="DELETE"
        onPress={async () => {
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
        }}
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
