import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

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

    //  if (loading) {
    //         return (
    //             <View style={styles.loading}>
    //                 <ActivityIndicator size={'small'} color={"#c91616"} />
    //             </View>
    //         )
    //     }

    return (
        <View style={styles.container}>
            <View>
            <Text>Pokemon Card</Text>
            <Text>Nome: {pokemon?.name}</Text>
            <Text>Altura: {pokemon?.height} metros</Text>
            {/* <Image style={styles.image}> </Image> */}
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
        height: 120,
        marginRight: 120,
    },
});
