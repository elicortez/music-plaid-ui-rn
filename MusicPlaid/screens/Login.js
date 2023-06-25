import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button } from "react-native-elements";
import { AuthContext } from '../contexts/AuthContext';
import * as AuthSession from 'expo-auth-session';
import { ResponseType, useAuthRequest } from "expo-auth-session";
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import Config from '../Config.js';

WebBrowser.maybeCompleteAuthSession();

const spotifyClientId = 'f99460ad37214fb4974e49ff36421725';
let redirectUri;
var currentURL = window.location.href;
redirectUri = currentURL;
console.log('Redirect URI: ', redirectUri);

const userDataUrl = Config.userDataUrl;

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const Login = ({ navigation }) => {
  const [loggingIn, setLoggingIn] = React.useState(false);
  const { setUser, setSpotifyProfile, setAppBackedInfo, setTopArtists, setUserData } = useContext(AuthContext);

  let accessToken = null;
  let access_token = null;

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: spotifyClientId, //TODO: obtain these values (clientId, scopes, etc.) from server
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-library-modify",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: redirectUri,
    },
    discovery
  );

  const fetchUserData = async (token) => {
    try {
      const spotifyProfileResponse = await axios("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      console.log('Spotify profile: ', spotifyProfileResponse.data);
      setSpotifyProfile(spotifyProfileResponse.data);

      const userDataResponse = await axios(userDataUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "spotify-token": token,
          Authorization: "Bearer " + token,
        },
      });

      console.log('User Data: ', userDataResponse.data);
      setUserData(userDataResponse.data);

      navigation.replace("Profile", {
        token: token,
        other: "blaaaa",
      });
    } catch (error) {
      console.log("An error occurred while fetching user data:", error);
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('userToken');
    if (storedAccessToken) {
      // User already logged in
      setUser(storedAccessToken);
      console.log('Stored access token: ', storedAccessToken);
      fetchUserData(storedAccessToken);
      // Call your APIs using this token or navigate to home
    }
  }, []);

  // Everything is done in a single chain once response is obtained, but we could be a bit smarter and parallelize spotify and user data, 
  // But need to make sure both are complete before navigating to profile
  useEffect(() => {
    if (response?.type === "success") {
      access_token = response.params.access_token;
      var data = JSON.stringify(response.params);
      console.log('Response Params', data)
      setUser(access_token);

      localStorage.setItem('userToken', access_token);
      console.log('Access token: ', access_token);
      fetchUserData(access_token);
    }
  }, [response]);

  const loginButton = loggingIn ?
    (<Button
      title="Logging in..."
      icon={{
        name: 'spotify',
        type: 'font-awesome',
        color: 'white',
        size: 30,
      }}
      disabled={true}
      buttonStyle={styles.button}
    />) :
    (<Button
      title="Login with Spotify"
      icon={{
        name: 'spotify',
        type: 'font-awesome',
        color: 'white',
        size: 30,
      }}
      buttonStyle={styles.button}
      onPress={() => {
        setLoggingIn(true);
        promptAsync();
      }}
    />);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image style={{ width: 300, height: 100 }} source={require('../assets/image1.png')} />
      {loginButton}
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
