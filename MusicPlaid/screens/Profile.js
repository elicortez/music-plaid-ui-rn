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
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Config from '../Config.js';
import { globalStyles } from '../styles/global';


const Profile = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { userData: authUserData } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log('Profile route params', route.params)

    if (route.params && route.params.id) {
      console.log('fetching another user', route.params.id)
      // if an id is provided, we'll fetch the user data from the server
      axios(`${Config.userDataUrl}?id=${route.params.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "spotify-token": authUserData.user.cached_token,
        },
      })
        .then((response) => {
          console.log('User Data: ', response.data);
          setUserData(response.data);
          setLoading(false);
        }).catch((error) => { console.log(error) }) // todo: do something when error is found, i.e., render an error screen
    } else {
      setUserData(authUserData); // sets the user data from the authentication context
      setLoading(false);
    }
  }, [route.params])

  if (loading) {
    return (<SafeAreaView style={globalStyles.container}><Text style={styles.text}>Loading...</Text></SafeAreaView>);
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfilePicure userData={userData} authUserDataId={authUserData.user.id} authUserData={authUserData} />
      <ProfileFollows navigation={navigation} userData={userData} />
      <FavoriteArtists userData={userData} />
      <LatestTracks navigation={navigation} userData={userData} />
      <Footer />
    </SafeAreaView>
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