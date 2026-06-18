import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
const IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

type PokemonProps = {
  name: string;
  url: string;
};

export default function Pokemon({ navigation }: any) {
  const [pokemon, setPokemon] = useState<PokemonProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");

  async function listarPokemon() {
    setLoading(true);

    try {
      const resp = await fetch(URL);
      const data = await resp.json();
      console.log("resposta", data.results);
      setPokemon(data.results);
    } catch (error) {
      console.log("erro", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    listarPokemon();
  }, []);

  function maiuscula(nome: string) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  function getPokemonImage(url: string) {
    const pokemonId = url.split("/").filter(Boolean).pop();
    return `${IMAGE}${pokemonId}.png`;
  }

  const pokemonFiltro = pokemon.filter((item) =>
    item.name.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#c91616" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>||- Pokédex -||</Text>

      <TextInput
        style={styles.inputBusca}
        placeholder="Buscar Pokémon"
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        style={{ flex: 1 }}
        data={pokemonFiltro}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum Pokémon encontrado.</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("PokemonDetails", { url: item.url })
            }
          >
            <Image
              source={{
                uri: getPokemonImage(item.url),
              }}
              style={styles.image}
            />

            <Text style={styles.name}>{maiuscula(item.name)}</Text>
            <Text style={styles.tapText}>Toque para ver detalhes</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f32121",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 10,
  },
  loading: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputBusca: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#29292e",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f87777",
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tapText: {
    fontSize: 12,
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});