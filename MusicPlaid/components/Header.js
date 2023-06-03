import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';

const Header = () => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);


    const handleSignOut = () => {
        console.log('Sign out button clicked');
        setUser(null);
        window.location = 'http://localhost:19006/';
    };

  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Image style={styles.logo} source={require('../assets/image1.png')} />
        </TouchableOpacity>
        <View style={styles.iconsContainer}> 
        <TouchableOpacity onPress={() => handleSignOut()}> 
            <Image 
            source={ {
                uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/exit.png',
            }}
            style={styles.icon}
            />
            
        </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },

    iconsContainer: {
        flexDirection: 'row',
    },

    logo: {
        width: 180,
        height: 50,
        resizeMode: 'contain',
        marginLeft: -25,
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },

    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },

    unreadBadgeText: {
        color: 'white',
        fontWeight: '600',
    }


})

export default Header