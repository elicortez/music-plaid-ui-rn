import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const ProfilePicure = () => {
  return (
    <View>
    <View style={{ alignItems: 'center'}}>
      <Image source={{uri: "https://cortez.me/images/eli.jpg"}} style={styles.story} />
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>Eli Cortez</Text>
        <Text style={{color: 'white', fontSize: 15, marginTop: 1}}>@elicortez</Text>
    </View>
    <View style={{ marginTop: 40, marginBottom:30, alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>17             270</Text>
        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Follower             Following</Text>
        
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
    story: {
        width: 150,
        height: 150,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: 'white',
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },

})


export default ProfilePicure