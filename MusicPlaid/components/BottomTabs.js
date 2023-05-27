import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import {Divider} from 'react-native-elements'

export const bottomTabsIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/60/ffffff/home.png',
        inactive: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
    },
    {
        name: 'Shop',
        active: 'https://img.icons8.com/fluency-systems-filled/60/ffffff/shopping-bag-full.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/shopping-bag-full.png',
    },
    {
        name: 'Profile',
        active: 'https://img.icons8.com/fluency-systems-filled/60/ffffff/user.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/user.png',
    },
]


const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home')

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{
          uri: icon.inactive
        }}
        style={[
          styles.icon
        ]}
      />
    </TouchableOpacity>
  )
  return (
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>

  )
}

export default BottomTabs

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
  },
  profilePic: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
})