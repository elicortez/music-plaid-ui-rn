import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LoginForm from '../components/LoginForm'

const INSTAGRAM_LOGO =
  'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png'

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={{  width: 300, height: 100} } source={require('../assets/image1.png')} />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    height: '100%',
    backgroundColor: 'black',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
})