import React, {useContext, useEffect} from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from "react-native-elements";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { AuthContext } from '../AuthContext';
import * as AuthSession from 'expo-auth-session';

// const discovery = {
//   authorizationEndpoint: "https://accounts.spotify.com/authorize",
//   tokenEndpoint: "https://accounts.spotify.com/api/token",
// };

const spotifyClientId = 'f99460ad37214fb4974e49ff36421725';
let redirectUri;
if (Platform.OS === 'web') {
  redirectUri = 'http://localhost:19006/auth';
} else {
  redirectUri = AuthSession.makeRedirectUri({ scheme: 'spotifyauthapp' });
}


const Login = () => {

  const { setUser } = useContext(AuthContext);
  let code = new URL(window.location.href).searchParams.get('code');

  const handleSignIn = async () => {
    console.log('Sign in button clicked');

    if (Platform.OS === 'web') {
      window.open(
        `https://accounts.spotify.com/authorize?` +
        `client_id=${spotifyClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=user-read-private%20user-read-email`,
        "_self"
      );
    } else {
      const result = await AuthSession.startAsync({
        authUrl:
          `https://accounts.spotify.com/authorize?` +
          `client_id=${spotifyClientId}` +
          `&response_type=code` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&scope=user-read-private%20user-read-email`,
      });

      if (result.type === 'success') {
        setUser(result.params.code);
        
      }
    }
  };

  useEffect(() => {
    console.log('User state in UnAuthScreen', code);
    if (code === null) {
      return;
    }

    setUser(code);
   
  }, []);

 

  // const [access_token] = "";
  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     responseType: ResponseType.Token,
  //     clientId: "f99460ad37214fb4974e49ff36421725",
  //     scopes: [
  //       "user-read-currently-playing",
  //       "user-read-recently-played",
  //       "user-read-playback-state",
  //       "user-top-read",
  //       "user-modify-playback-state",
  //       "streaming",
  //       "user-read-email",
  //       "user-read-private",
  //     ],
  //     // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
  //     // this must be set to false
  //     usePKCE: false,
  //     redirectUri: "https://192.168.1.157:19006",
  //   },
  //   discovery
  // );

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     access_token  = response.params.access_token;
  //     console.log(access_token);
  //   }
  // }, [response]);

  // useEffect(() => {
  //   if (access_token) {
  //     console.log(access_token);
  //     setTimeout(
  //       () =>
  //         navigation.replace("Profile", {
  //           token: access_token,
  //           other: "blaaaa",
  //         }),
  //       500
  //     );
  //   }

  // });

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
