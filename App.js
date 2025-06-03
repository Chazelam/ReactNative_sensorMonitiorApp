import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccelerometerScreen from './sensors/accelerometer';
import GyroscopeScreen from './sensors/gyroscope';
import MotionScreen from './sensors/motion'

export default function App() {
  return (
    <View style={styles.container}>
      <AccelerometerScreen />
      <GyroscopeScreen />
      <MotionScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
