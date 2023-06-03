import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { TRACKS } from '../data/tracks'


const LatestTracks = () => {
    return (
        <View style={{marginBottom: 10}}>
            <View>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom:10, marginLeft: 10}}>Latest Tracks</Text>
            </View>
    
    
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            >
                {TRACKS.map((story, index) => (
                    <View key={index} style={{alignItems: 'center'}}>
                        <Image source={{uri: story.image}} style={styles.story} />
    
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