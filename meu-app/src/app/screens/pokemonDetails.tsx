import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";

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

const typeColors: any = {
    normal: "#A8A77A",
    fire: "#FF6B35",
    water: "#4D96FF",
    electric: "#F7C600",
    grass: "#4CAF50",
    ice: "#6DD5D5",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#D9A441",
    flying: "#6C63FF",
    psychic: "#F95587",
    bug: "#8CB230",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#8F9AAF",
    fairy: "#D685AD",
};

export default function PokemonDetails({ route, navigation }: any) {
    const { pokemon } = route.params;

    function maiuscula(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    function formatarTexto(texto: string) {
        return texto
            .split("-")
            .map((parte) => maiuscula(parte))
            .join(" ");
    }

    const mainColor = colors[pokemon.type[0]] || colors.normal;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={[styles.imageBox, { backgroundColor: mainColor }]}>
                <Text style={styles.number}>
                    #{pokemon.id.toString().padStart(3, "0")}
                </Text>

                <Image source={{ uri: pokemon.img }} style={styles.image} />
            </View>

            <View style={styles.card}>
                <Text style={styles.name}>{maiuscula(pokemon.name)}</Text>

                <View style={styles.typesContainer}>
                    {pokemon.type.map((tipo: string) => (
                        <Text
                            key={tipo}
                            style={[
                                styles.typeBadge,
                                { backgroundColor: typeColors[tipo] || "#999" },
                            ]}
                        >
                            {formatarTexto(tipo)}
                        </Text>
                    ))}
                </View>

                <View style={styles.infoContainer}>
                    <View style={[styles.infoCard, { backgroundColor: mainColor }]}>
                        <Text style={styles.infoValue}>{pokemon.height / 10} m</Text>
                        <Text style={styles.infoLabel}>Altura</Text>
                    </View>

                    <View style={[styles.infoCard, { backgroundColor: mainColor }]}>
                        <Text style={styles.infoValue}>{pokemon.weight / 10} kg</Text>
                        <Text style={styles.infoLabel}>Peso</Text>
                    </View>

                    <View style={[styles.infoCard, { backgroundColor: mainColor }]}>
                        <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
                        <Text style={styles.infoLabel}>Exp.</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Habilidades</Text>

                    <View style={styles.abilitiesContainer}>
                        {pokemon.abilities.map((ability: string, index: number) => (
                            <Text key={index} style={styles.abilityBadge}>
                                {formatarTexto(ability)}
                            </Text>
                        ))}
                    </View>
                </View>

                <Text style={styles.description}>
                    {maiuscula(pokemon.name)} é um Pokémon do tipo{" "}
                    {pokemon.type.map((tipo: string) => formatarTexto(tipo)).join(" e ")}.
                    Ele possui habilidades especiais que podem ser usadas durante as batalhas.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Escolher outro Pokémon</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EEF5",
    },
    content: {
        padding: 18,
        paddingBottom: 40,
    },
    imageBox: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 20,
        alignItems: "center",
        minHeight: 230,
    },
    number: {
        alignSelf: "flex-end",
        color: "#9CA3AF",
        fontWeight: "bold",
        fontSize: 13,
        marginBottom: 4,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: "contain",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        padding: 22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 10,
    },
    typesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
    },
    typeBadge: {
        color: "#FFFFFF",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: "bold",
    },
    infoContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 4,
    },
    infoCard: {
        flex: 1,
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: "center",
    },
    infoValue: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#111827",
    },
    infoLabel: {
        marginTop: 6,
        fontSize: 10,
        color: "#8A94A6",
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#8A94A6",
        textTransform: "uppercase",
        marginBottom: 10,
    },
    abilitiesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    abilityBadge: {
        backgroundColor: "#F1F3F8",
        color: "#111827",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: "600",
    },
    description: {
        marginTop: 22,
        fontSize: 14,
        lineHeight: 22,
        color: "#555",
        textAlign: "center",
    },
    button: {
        marginTop: 24,
        backgroundColor: "#E7000B",
        paddingVertical: 15,
        borderRadius: 18,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },
});