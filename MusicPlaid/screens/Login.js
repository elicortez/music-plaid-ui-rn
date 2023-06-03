import React, {useContext, useEffect} from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button } from "react-native-elements";
import { AuthContext } from '../AuthContext';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

const spotifyClientId = '7e722168f9d448c59db128e846fcac91';
const spotifyClientSecret = '43cc5e3eab3d4af2a2b4e0b067e284ec';
let redirectUri;
redirectUri = 'https://musicwebapp-bdbe8.web.app/auth';
//redirectUri = 'http://localhost:19006/auth';



const Login = () => {

  const { setUser, setSpotifyProfile, setAppBackedInfo, setTopArtists } = useContext(AuthContext);
  
  let code = new URL(window.location.href).searchParams.get('code');
  let accessToken = '';

  const handleSignIn = async () => {
    console.log('Sign in button clicked');
      window.open(
        `https://accounts.spotify.com/authorize?` +
        `client_id=${spotifyClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=user-read-private%20user-read-email`,
        "_self"
      );
  };

  useEffect(() => {
    if (code === null) {
      return;
    }
    setUser(code);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
          `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${spotifyClientId}&client_secret=${spotifyClientSecret}`, 
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        );
  
        // Get the access token from the response
        const data = response.data;
        accessToken = data.access_token;
        console.log('Access token: ', accessToken);
  
        axios("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((response) => {
            console.log('Spotify profile: ', response.data);
            setSpotifyProfile(response.data);
          })
  
      } catch(error) {
        // Handle error
        console.log(error);
      }
    }
    };
    fetchData();
  }, [code]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <Image style={{ width: 300, height: 100} } source={require('../assets/image1.png')} />
      <Button
        title="Login with Spotify"
        icon={{
          name: 'spotify',
          type: 'font-awesome',
          color: 'white',
          size: 30,
        }}
        buttonStyle={styles.button}
        onPress={() => {
          handleSignIn();
        }}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );


}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  button: {
    width: 200,
    height: 60,
    marginTop: 50,
    backgroundColor: '#1DB954'
  },
});
