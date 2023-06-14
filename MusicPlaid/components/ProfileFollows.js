import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';


const ProfileFollows = ({ navigation, userData }) => {
  const handleFollowingTap = () => {
    navigation.navigate('PeopleList', { title: 'Following', people: userData.following })
  };

  const handleFollowersTap = () => {
    navigation.navigate('PeopleList', { title: 'Followers', people: userData.followers })
  };

  if (userData === null) {
    return null;
  }

  return (
    <View style={{ marginTop: 40, marginBottom: 40, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
      <TouchableOpacity onPress={handleFollowersTap}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{userData.followers.length}</Text>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Followers</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFollowingTap}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{userData.following.length}</Text>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Following</Text>
        </View>
      </TouchableOpacity>
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


export default ProfileFollows