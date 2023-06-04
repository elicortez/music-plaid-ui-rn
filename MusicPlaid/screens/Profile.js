import { StyleSheet } from 'react-native'
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import React, {useContext} from 'react'
import Header from '../components/Header'

import Footer from '../components/Footer';
import ProfilePicure from '../components/ProfilePicure';
import FavoriteArtists from '../components/FavoriteArtists';
import LatestTracks from '../components/LatestTracks';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const { spotifyProfile } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
        <Header/>
        <ProfilePicure/>
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