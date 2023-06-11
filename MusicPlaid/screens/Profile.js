import { StyleSheet } from 'react-native'
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import React, {useContext} from 'react'
import Header from '../components/Header'

import Footer from '../components/Footer';
import ProfilePicure from '../components/ProfilePicure';
import ProfileFollows from '../components/ProfileFollows';
import FavoriteArtists from '../components/FavoriteArtists';
import LatestTracks from '../components/LatestTracks';
import { UserContext, UserProvider } from '../UserContext';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import Config from '../Config.js';


const Profile = ( {navigation, route} ) => {
  //const { setUserData } = useContext(UserContext);
  const { userData, setUserData } = useContext(AuthContext);

  React.useEffect(() => {
    console.log('Profile route params', route.params)
    if (route.params.id) {
      console.log('fetching another user', route.params.id)
      // if an id is provided, we'll fetch the user data from the server
      axios(`${Config.userDataUrl}?id=${route.params.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log('User Data: ', response.data);
        setUserData(response.data); // todo: this should set the user in a different context (UserContext) instead of AuthContext, to avoid confusion and differentiate
      })
} else {
      setUserData(userData) // sets the user data from the authentication context
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <Header/>
        <ProfilePicure/>
        <ProfileFollows navigation={navigation}/>
        <FavoriteArtists/>
        <LatestTracks  />
        <Footer /> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      flex: 1,
  },
})

export default Profile