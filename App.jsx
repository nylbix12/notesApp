import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';

import Dashboard from './screens/Dashboard';
import Note from './screens/Note';
import Formulaire from './screens/Formulaire';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Note" component={Note} />
          <Stack.Screen name="Formulaire" component={Formulaire} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
