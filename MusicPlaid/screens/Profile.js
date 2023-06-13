import { Text, StyleSheet } from 'react-native'
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import ProfilePicure from '../components/ProfilePicure';
import ProfileFollows from '../components/ProfileFollows';
import FavoriteArtists from '../components/FavoriteArtists';
import LatestTracks from '../components/LatestTracks';
import { UserContext, UserProvider } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Config from '../Config.js';
import { globalStyles } from '../styles/global';


const Profile = ({ navigation, route }) => {
  //const { setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { userData: authUserData, setUserData: setAuthUserData } = useContext(AuthContext);
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
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
          setLoading(false);
        }).catch((error) => { console.log(error) }) // todo: do something when error is found, i.e., render an error screen
    } else {
      setUserData(authUserData); // sets the user data from the authentication context
      setLoading(false);
    }
  }, [])

  if (loading) {
    return (<SafeAreaView style={globalStyles.container}><Text style={styles.text}>Loading...</Text></SafeAreaView>);
  }

  return (
    <UserProvider>
      <SafeAreaView style={globalStyles.container}>
        <ProfilePicure />
        <ProfileFollows navigation={navigation} />
        <FavoriteArtists />
        <LatestTracks navigation={navigation} />
        <Footer />
      </SafeAreaView>
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 40,
  },
  text: {
    color: 'white',
  }
})

export default Profile