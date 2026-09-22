import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { store } from './src/redux/store';
import DemoScreen from './src/screens/DemoScreen';

export default function App() {
  // Hai provider có trách nhiệm riêng: Redux cho cart, Context cho theme.
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <DemoScreen />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
