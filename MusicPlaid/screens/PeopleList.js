import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import Header from '../components/Header'
import { globalStyles } from '../styles/global';
import Footer from '../components/Footer';



const PeopleList = ({ navigation, route }) => {
  console.log('people route params', route.params)

  const handlePersonPressed = (id) => {
    navigation.push('Profile', { id: id })
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{route.params.title}</Text>
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        {route.params.people.map((person, index) => (
          <TouchableOpacity key={index} onPress={() => handlePersonPressed(person.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
              <Image source={{ uri: person.img_url }} style={styles.imageThumbnail} />
              <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{person.display_name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Footer/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  imageThumbnail: {
    width: 40,
    height: 40,
  },
})

export default PeopleList