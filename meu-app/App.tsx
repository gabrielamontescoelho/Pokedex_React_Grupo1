import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokemon from './src/app/screens/pokemon';
import PokemonDetails from './src/app/screens/pokemonDetails';


export default function App() {
  const Stack = createStackNavigator<any>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Pokemon"
            component={Pokemon}
            options={{ title: 'Pokemon' }}
        />
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetails}
          options={{ title: 'Detalhes do Pokemon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
