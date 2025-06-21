import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Provider } from 'react-redux';
import store from './redux/store';

import Dashboard from './screens/Dashboard';
import Note from './screens/Note';
import Formulaire from './screens/Formulaire';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  if (!fontsLoaded) return <AppLoading />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard"
        screenOptions={{
            headerStyle: { backgroundColor: '#114B5F' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontFamily: 'Montserrat_700Bold' },
          }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Note" component={Note} />
          <Stack.Screen name="Formulaire" component={Formulaire} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
