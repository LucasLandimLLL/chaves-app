import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonagensListagem from './src/PersonagensListagem';
import DetalhesPersonagem from './src/DetalhesPersonagem';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Personagens" // Nome da lista de personagens
          component={PersonagensListagem}
          options={{ headerShown: false }} 
        />
   <Stack.Screen 
          name="Detalhes" 
          component={DetalhesPersonagem}
          options={{
            headerShown: true,
            title: 'Detalhes', 
            headerStyle: {
              backgroundColor: 'black', 
            },
            headerTitleStyle: {
              fontSize: 24, 
              color: 'red', 
            },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
