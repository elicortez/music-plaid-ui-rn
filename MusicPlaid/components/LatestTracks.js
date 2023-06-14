import { View, Text, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'


const LatestTracks = ({ navigation, userData }) => {
    if (userData === null) {
        return null;
    }

    //todo: use flatlist instead
    const renderItem = (track, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => {
                navigation.navigate('Music', { title: 'Song', id: track.id })
            }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{track.track_name}</Text>
                    <Text style={{ color: 'gray', fontSize: 12, marginBottom: 10, marginLeft: 10 }}>{track.artist_name}</Text>
                    <Image source={{ uri: track.img_url }} style={styles.story} />
                </View>
            </TouchableOpacity>);
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: 10 }}>Latest Tracks</Text>
            </View>

            {/* <FlatList data={userData.recent_tracks} renderItem={renderItem} horizontal={false} showsHorizontalScrollIndicator={false} keyExtractor={(item, index) => index.toString()} /> */}
            <ScrollView
                showsHorizontalScrollIndicator={false}
            >
                {userData.recent_tracks.map(renderItem)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    story: {
        width: 20,
        height: 20,
    },
})

export default LatestTracks