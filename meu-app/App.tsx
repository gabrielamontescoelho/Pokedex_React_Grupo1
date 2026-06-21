import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/app/screens/Home";
import PokemonDetails from "./src/app/screens/pokemonDetails";

export default function App() {
  const Stack = createStackNavigator<any>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Pokédex" }}
        />

        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetails}
          options={{ title: "Detalhes do Pokémon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}