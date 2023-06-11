import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../AuthContext';


const LatestTracks = () => {
    const {userData} = useContext(AuthContext);

    return (
        <View style={{marginBottom: 10}}>
            <View>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom:10, marginLeft: 10}}>Latest Tracks</Text>
            </View>
    
    
        <ScrollView 
            vertical 
            showsHorizontalScrollIndicator={false}
            >
                {userData.recent_tracks.map((track, index) => (
                    <View key={index} style={{alignItems: 'left'}}>
                        <Text style={{color: 'white', fontSize: 15, marginLeft: 10}}>{track.track_name}</Text>
                        <Text style={{color: 'gray', fontSize: 12, marginBottom:10, marginLeft: 10}}>{track.artist_name}</Text>
                        {/* <Image source={{uri: track.img_url}} style={styles.story} /> */}
                    </View>
                ))}
        </ScrollView>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        story: {
            width: 100,
            height: 100,
            borderRadius: 20,
            marginLeft: 15,
        },
    })

export default LatestTracks