import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import Header from '../components/Header'
import { globalStyles } from '../styles/global';



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
            <View  style={{ alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 15 }}>{person.display_name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
})

export default PeopleList