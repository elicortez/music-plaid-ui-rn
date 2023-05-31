import React, {useEffect} from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button } from "react-native-elements";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import * as tokenAction from "../store/actions/token";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};


const LoginScreen = ({ navigation }) => {
  access_token = "";
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "f99460ad37214fb4974e49ff36421725",
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
      redirectUri: "exp://192.168.1.157:19000",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      console.log(response.params.access_token);
      console.log(response.params);
      console.log("====================================");
      access_token  = response.params;
      console.log(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (access_token) {
      console.log(access_token);
      setTimeout(
        () =>
          navigation.replace("Profile", {
            token: access_token,
            other: "blaaaa",
          }),
        500
      );
    }

  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          marginBottom: "20%",
        }}
      >
        top song player
      </Text>
      <Button
        title="Login with Spotify"
        style={styles.button}
        onPress={() => {
          promptAsync();
        }}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );


}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  button: {
    width: 200,
    marginTop: 50,
  },
});
