import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function MotionScreen() {
  const [motionData, setData] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
    accelerationIncludingGravity: { x: 0, y: 0, z: 0 },
    rotation: { alpha: 0, beta: 0, gamma: 0 },
    rotationRate: { alpha: 0, beta: 0, gamma: 0 },
    orientation: 0
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => DeviceMotion.setUpdateInterval(1000);
  const _fast = () => DeviceMotion.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener(motionData => {
        setData(prev => ({
          ...prev, // Копируем все свойства из предыдущего состояния
          ...motionData, // Добавляем/перезаписываем свойства из новых данных
          acceleration: motionData.acceleration || prev.acceleration,
          rotationRate: motionData.rotationRate || prev.rotationRate
        }));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Motion sensor:</Text>
      <Text style={styles.text}>Device acceleration on the three axis</Text>
      <Text style={styles.text}>Expressed in meters per second squared (m/s^2).</Text>

      <Text style={styles.text}>x: {motionData.acceleration.x.toFixed(4)}</Text>
      <Text style={styles.text}>y: {motionData.acceleration.y.toFixed(4)}</Text>
      <Text style={styles.text}>z: {motionData.acceleration.z.toFixed(4)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    minWidth:70,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
