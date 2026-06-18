import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const URL = "https://pokeapi.co/api/v2/pokemon?limit=151"
const IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

type PokemonProps = {
    name: string;
    url: string;
}

export default function Pokemon({ navigation }: any) {

    const [pokemon, setPokemon] = useState<PokemonProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function listarPokemon() {
        setLoading(true);
        try {
            const resp = await fetch(URL);
            const data = await resp.json();
            console.log('resposta', data.results)
            setPokemon(data.results);
        } catch (error) {
            console.log('erro', error);
        } finally {
            setTimeout(() => { setLoading(false) }, 2000)
        }
    }

    useEffect(() => { listarPokemon() }, []);

    function maiuscula(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'small'} color={"#c91616"} />
            </View>
        )
    }

    function getPokemonImage(url: string) {
        const pokemonId = url.split('/').filter(Boolean).pop();
        return `${IMAGE}${pokemonId}.png`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>||- Lista de Pokemons -||</Text>
            {//loading ? <ActivityIndicator size={'small'} color={"#c91616"}/>: 
                <FlatList
                    data={pokemon}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('PokeInfo', { url: item.url })}
                        >
                            <Image
                                source={{ uri: getPokemonImage(item.url) }}
                                style={styles.image}
                            />
                            <Text>{maiuscula(item.name)}</Text>
                        </TouchableOpacity>
                    )}
                />
            }
            {/*
            {pokemon.map((item:PokemonProps)=>
            <View key={item.url}>
                <Text>{item.name}</Text>
                <Text>{item.url}</Text>
            </View>
            )}
            */}
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f32121",
        alignItems: "stretch",
        justifyContent: "flex-start",
        padding: 10,
        marginBottom: 10


    },
    loading: {
        flex: 1,
        backgroundColor: "#f1111",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 25,
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: "#f87777",
        borderRadius: 8,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
});