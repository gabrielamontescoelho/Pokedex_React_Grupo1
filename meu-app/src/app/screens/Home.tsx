import { useEffect, useState } from "react";
import {ActivityIndicator,FlatList,Image,StyleSheet,Text,View,TouchableOpacity,TextInput,} from "react-native";

const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const colors: any = {
    normal: "#F5F5F5",
    fire: "#FFE5D6",
    water: "#DDEEFF",
    electric: "#FFF4BF",
    grass: "#DDF6DF",
    ice: "#E0F8F8",
    fighting: "#F4D8D8",
    poison: "#EBDDF7",
    ground: "#F3E4C8",
    flying: "#E8E6FF",
    psychic: "#FFE0EE",
    bug: "#EEF6D5",
    rock: "#E8DFC2",
    ghost: "#E7E0F5",
    dragon: "#DDD8FF",
    dark: "#DCD7D3",
    steel: "#E6E8F0",
    fairy: "#FFE4F3",
};

type PokemonProps = {
    id: number;
    name: string;
    img: string;
    height: number;
    weight: number;
    base_experience: number;
    type: string[];
    abilities: string[];
};

export default function Home({ navigation }: any) {
    const [pokemon, setPokemon] = useState<PokemonProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [busca, setBusca] = useState("");

    async function listarPokemon() {
        setLoading(true);

        try {
        const resp = await fetch(URL);
        const data = await resp.json();

        const resultado = await Promise.all(
        data.results.map(async (item: any) => {
        const detalheResp = await fetch(item.url);
        const detalhe = await detalheResp.json();

        return {
            id: detalhe.id,
            name: detalhe.name,
            img: detalhe.sprites.other["official-artwork"].front_default,
            height: detalhe.height,
            weight: detalhe.weight,
            base_experience: detalhe.base_experience,
            type: detalhe.types.map((t: any) => t.type.name),
            abilities: detalhe.abilities.map((a: any) => a.ability.name),
        };
    })
    ); 

        setPokemon(resultado);
    } catch (error) {
        console.log("erro", error);
    } finally {
        setLoading(false);
    }
}

    useEffect(() => {
    listarPokemon();
    }, []);

    function maiuscula(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }


    const pokemonFiltro = pokemon.filter((item) =>
        item.name.toLowerCase().includes(busca.toLowerCase()) ||
        item.id.toString().includes(busca)
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
        <View style={styles.header}>
            <Text style={styles.title}>Pokémon</Text>
            <Text style={styles.subtitle}>{pokemon.length} Pokémon disponíveis - Geração I</Text>

            <TextInput
            style={styles.inputBusca}
            placeholder="Buscar Pokémon"
            placeholderTextColor="#777"
            value={busca}
            onChangeText={setBusca}
            />
        </View>

        <FlatList
            data={pokemonFiltro}
            keyExtractor={(item) => item.name}
            numColumns={2}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.row}
            ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum Pokémon encontrado.</Text>
            )}
            renderItem={({ item }) => (
            <TouchableOpacity
            style={[
                    styles.card,
                    {
                        backgroundColor: colors[item.type[0]] || "#AAA",
                    },
                ]}
                onPress={() =>
                navigation.navigate("PokemonDetails", { pokemon: item})
                }
            >
                <Text style={styles.pokemonNumber}>
                #{item.id.toString().padStart(3, "0")}
                </Text>

                <Image
                source={{ uri: item.img }}
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
        backgroundColor: "#FFFFFF",
    },
    loading: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        marginBottom: 12,
        backgroundColor: "#E7000B",
        padding: 16,
        paddingBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        color: "#fff",
        textAlign: "center",
        marginTop: 4,
        marginBottom: 14,
    },
    inputBusca: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 14,
        fontSize: 16,
    },
    listContent: {
        paddingBottom: 40,
        paddingHorizontal: 12,
    },
    card: {
        width: "46%",
        minHeight: 170,
        marginBottom: 14,
        borderRadius: 22,
        padding: 14,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
    },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
    },
    pokemonNumber: {
        alignSelf: "flex-end",
        fontSize: 12,
        fontWeight: "bold",
        color: "#555",
    },
    image: {
        width: 105,
        height: 105,
        marginBottom: 8,
        resizeMode: "contain",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    tapText: {
        fontSize: 12,
        marginTop: 4,
        textAlign: "center",
        color: "#555",
    },
    emptyText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
    pokemonImage: {
        width: 115,
        height: 115,
        resizeMode: "contain",
        marginTop: -8,
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#111827",
        marginTop: 4,
    },
    detailsText: {
        fontSize: 11,
        color: "#8A94A6",
        textAlign: "center",
        marginTop: 8,
    },
    row: {
    justifyContent: "center",
        gap:20
    },
});