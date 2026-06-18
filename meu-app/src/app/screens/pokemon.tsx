import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
    
const URL = "https://pokeapi.co/api/v2/pokemon?limit=151"
const IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

type PokemonProps={
    name:string;
    url:string;
}

export default function Pokemon ({ navigation }: any){
    
    const [pokemon, setPokemon] = useState<PokemonProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [busca, setBusca] = useState('');

    async function listarPokemon() {
        setLoading(true);
        try {
            const resp = await fetch(URL);
            const data = await resp.json();
            console.log('resposta',data.results)
            setPokemon(data.results);
        } catch (error) {
            console.log('erro',error);
        }finally{
            setTimeout(()=>{setLoading(false)}, 2000)
        }
    }

    useEffect(()=>{listarPokemon()},[]);

    function maiuscula(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    if (loading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size={'small'} color={"#c91616"}/>
            </View>
        )
    }

    function getPokemonImage(url: string){
        const pokemonId = url.split('/').filter(Boolean).pop();
    return `${IMAGE}${pokemonId}.png`;
    };

    const pokemonFiltro = pokemon.filter((item)=>
        item.name.toLocaleLowerCase().includes(busca.toLowerCase())
    );


    return(
        <View style={styles.container}>
            <Text style={styles.title}>||- Pokédex -||</Text>

            <TextInput style={styles.inputBusca}
                placeholder="Buscar Pokémon"
                value={busca}
                onChangeText={(texto) => setBusca(texto)}
            />

            <FlatList
                data={pokemonFiltro}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}
                        onPress={() => navigation.navigate('PokemonDetails', { url: item.url })}
                    >
                    <Image
                        source={{
                        uri: getPokemonImage(item.url)
                        }}
                        style={styles.image}
                    />
                    <Text>{maiuscula(item.name)}</Text>
                    <Text style={styles.tapText}>Toque para ver detalhes</Text>
                    </TouchableOpacity>
                )}
                />
            
            {/*
            {pokemon.map((item:PokemonProps)=>
            <View key={item.url}>
                <Text>{item.name}</Text>
                <Text>{item.url}</Text>
            </View>
            )}
            */}
        </View>
    )};


    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:"#f33939",
            alignItems:"stretch",
            justifyContent:"flex-start",
            padding: 10,
            marginBottom: 10
        },
        loading:{
            flex:1,
            backgroundColor:"#f1f1f1",
            alignItems:"center",
            justifyContent:"center"
        },
        title:{
            fontSize:25,
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
        tapText: {
            fontSize: 12,
            marginTop: 4,
        },
        inputBusca: {
            backgroundColor: '#fffff',
            borderRadius: 8,
            padding: 12,
            marginBottom: 15,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#29292e',
        }
    });