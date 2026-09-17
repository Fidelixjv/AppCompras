import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import { MainScreen } from './src/screens/MainScreen';
import { SplashScreen } from './src/screens/SplashScreen';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const onSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <MainScreen />
          {!splashDone && <SplashScreen onDone={onSplashDone} />}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaProvider>
  );
}