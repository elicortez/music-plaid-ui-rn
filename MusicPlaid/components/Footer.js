import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const handleProfile = () => {
    // navigate to login screen
        navigation.navigate('Profile');
    };

    const handleFeed= () => {
      // navigate to login screen
          navigation.navigate('Feed');
      };
  

 
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
        <TouchableOpacity onPress={() => handleFeed()}> 
            <Image 
            source={ {
                uri: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
            }}
            style={styles.icon}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleProfile()}> 
            <Image 
            source={ {
                uri: 'https://img.icons8.com/fluency-systems-filled/60/ffffff/user.png',
            }}
            style={styles.icon}
            />
        </TouchableOpacity>
        </View>
      </View>

      )
  }
export default Footer

const styles = StyleSheet.create({
  wrapper: {
    position: 'sticky',
    width: '100%',
    bottom: 0,
    backgroundColor: '#000',
  },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 50,
      padding: 10,
    },
    icon: {
      width: 30,
      height: 30,
    }
  })