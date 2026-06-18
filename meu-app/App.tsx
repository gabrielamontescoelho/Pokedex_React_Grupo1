import { StyleSheet, View, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Pokemon from "./src/app/screens/pokemon";
import PokemonDetails from "./src/app/screens/pokemonDetails";

const Stack = createStackNavigator();

export default function App() {
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.appContainer, { height }]}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              flex: 1,
            },
          }}
        >
          <Stack.Screen
            name="Pokemon"
            component={Pokemon}
            options={{ title: "Pokemon" }}
          />

          <Stack.Screen
            name="PokemonDetails"
            component={PokemonDetails}
            options={{ title: "Detalhes do Pokemon" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: "100%",
  },
});