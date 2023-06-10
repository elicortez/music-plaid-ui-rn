import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext';
import { Icon } from 'react-native-elements';

const ProfilePicure = () => {
  const { spotifyProfile, userData } = useContext(AuthContext);

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Image source={{ uri: userData.user.img_url }} style={styles.story} />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Icon
            name='spotify'
            type='font-awesome'
            color='white'
            size={30}
          />
          <Text style={{ color: 'white', fontSize: 18, marginTop: 1 }}> {userData.user.display_name}</Text>
        </View>
      </View>
      <View style={{ marginTop: 40, marginBottom: 40, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{userData.friends.length}</Text>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Followers</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{userData.friends.length}</Text>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Following</Text>
        </View>

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