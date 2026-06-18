import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function PokemonDetails({ route }: any) {

    const [pokemon, setPokemon] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const url = route.params.url;
    console.log('route', route.params.url)

    async function getDetails() {
        setLoading(true)
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPokemon(data);
            console.log('data', data.sprites?.versions?.["generation-vii"]?.["brilliant-diamond-shining-pearl"].front_default); //  console.log('data', data.abilities[1].ability.name); para conseguir entrar dentro do array/lista
        } catch (error) {

        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getDetails();
    }, [])


    return (
        <View style={styles.container}>
            <View>
            <Text>Pokemon Card</Text>
            <Image
                source={{ uri: pokemon?.sprites?.front_default }}
                style={styles.image}
            />
            <Text>Número/ID: {pokemon?.id}</Text>
            <Text>Nome: {pokemon?.name}</Text>
            <Text>
                Tipo: {pokemon?.types?.map((item: any) => item.type.name).join(", ")}</Text>
            <Text>
                Habilidades: {pokemon?.abilities?.map((item: any) => item.ability.name).join(", ")}
            </Text>
            <Text>Altura: {pokemon ? (pokemon.height / 10).toFixed(1) : ""} metros</Text>
            <Text>Peso: {pokemon ? (pokemon.weight / 10).toFixed(1) : ""} kg</Text>
            <Text>Experiência base: {pokemon?.base_experience}</Text>
         
            </View>
        </View>

    );
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
        backgroundColor: "#f1f1f1",
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
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 10,
    },
});