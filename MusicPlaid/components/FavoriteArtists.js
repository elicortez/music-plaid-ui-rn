import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ARTISTS } from '../data/artists'

const FavoriteArtists = () => {
  return (
    <View style={{marginBottom: 20}}>
        <View>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom:10, marginLeft: 10}}>Favorite Artists</Text>
        </View>


    <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        >
            {ARTISTS.map((story, index) => (
                <View key={index} style={{alignItems: 'center', marginBottom:20}}>
                    <Image source={{uri: story.image}} style={styles.story} />

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