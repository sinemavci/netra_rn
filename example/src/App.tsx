import 'react-native-get-random-values';
import { View, StyleSheet, Button } from 'react-native';
import {
  NetraClient,
  OfflinePolicyAction,
  RequestOptions,
  SlowNetworkPolicyAction,
} from 'netra-react-native';

export default function App() {
  const client = new NetraClient({
    baseUrl: 'http://10.0.2.2:3001',
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
