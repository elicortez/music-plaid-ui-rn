import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

const FavoriteArtists = ({ userData }) => {
    return (
        <View style={{ marginBottom: 0 }}>
            <View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: 10 }}>Favorite Artists</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {userData.fav_artists.map((artist, index) => (
                    <View key={index} style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Image source={{ uri: artist.image_url }} style={styles.story} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    story: {
        width: 120,
        height: 120,
        borderRadius: 20,
        marginLeft: 15,
    },
})

export default FavoriteArtists