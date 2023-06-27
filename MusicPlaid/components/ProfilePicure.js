import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Icon } from 'react-native-elements';
import axios from 'axios';
import Config from '../Config.js';

const ProfilePicure = ({ userData, authUserDataId, authUserData }) => {
  if (userData === null) {
    return null;
  }

  console.log('authUserData', authUserData)
  const userExists = authUserData.following.some(user => user.id === userData.user.id);

  const handleAddUser = () => {
    
    axios(`${Config.follow_user}?id=${userData.user.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "spotify-token": authUserData.user.cached_token,
        Authorization: "Bearer " + authUserData.user.cached_token,
      }
    }
    )
    .then((response) => {
      console.log('Response Data: ', response.data);
    }).catch((error) => { console.log(error) })

  };

  
  const handleRemoveUser = () => {
    
    axios(`${Config.unfollow_user}?id=${userData.user.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "spotify-token": authUserData.user.cached_token,
        Authorization: "Bearer " + authUserData.user.cached_token,
      }
    }
    )
    .then((response) => {
      console.log('Response Data: ', response.data);
    }).catch((error) => { console.log(error) })

  };

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
          <Text style={{ color: 'white', fontSize: 18, marginTop: 1 }}> {userData.user.display_name}      </Text>
          {userData.user.id !== authUserDataId && (
              !userExists ? (
                <TouchableOpacity onPress={() => handleAddUser()}>
                  <Icon
                    name='add-circle'
                    type='MaterialIcons'
                    color='white'
                    size={30}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleRemoveUser()}>
                  <Icon
                    name='remove-circle'
                    type='MaterialIcons'
                    color='white'
                    size={30}
                  />
                </TouchableOpacity>
              )
            )}

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