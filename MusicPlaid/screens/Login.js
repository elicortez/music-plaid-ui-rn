import React, {useContext, useEffect} from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button } from "react-native-elements";
import { AuthContext } from '../AuthContext';
import * as AuthSession from 'expo-auth-session';
import { ResponseType, useAuthRequest } from "expo-auth-session";
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

const spotifyClientId = '7e722168f9d448c59db128e846fcac91';
let redirectUri;
redirectUri = 'https://musicwebapp-bdbe8.web.app/';
//redirectUri = 'https://localhost:19006/';



const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const Login = ({ navigation }) => {

  const { setUser, setSpotifyProfile, setAppBackedInfo, setTopArtists } = useContext(AuthContext);
  
  let accessToken = null;
  let code = null;
  let access_token = null;

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: spotifyClientId,
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      access_token = response.params.access_token;
      setUser(access_token);
      
    }
  }, [response]);


  useEffect(() => {

    if (access_token) {
      console.log('Access token: ', access_token);
      axios("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
        .then((response) => {
          console.log('Spotify profile: ', response.data);
          setSpotifyProfile(response.data);
        })
        .catch((error) => {
          console.log("error", error.message);
        });

      setTimeout(
        () =>
          navigation.replace("Feed", {
            token: accessToken,
            other: "blaaaa",
          }),
        500
      );
    }
  });

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
          promptAsync();
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
