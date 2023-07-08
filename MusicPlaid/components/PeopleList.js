import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'


const PeopleList = ({ people, navigation }) => {

  const handlePersonPressed = (id) => {
    navigation.push('Profile', { id: id })
  }

  // TODO: Use a FlatList react component instead of a map
  return (
    <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      {people.map((person, index) => (
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} key={index} onPress={() => handlePersonPressed(person.id)}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <Image source={{ uri: person.img_url }} style={styles.imageThumbnail} />
            <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{person.display_name}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {
                person.compat_score ? (
                  <Text style={{ flex: 1, color: 'white', fontSize: 15, textAlign: 'right', marginRight: 10 }}>Compat: {person.compat_score}</Text>
                )
                  : null
              }
            </View>
          </View>
        </TouchableOpacity>
      ))
      }
    </View >
  )
}

const styles = StyleSheet.create({
  imageThumbnail: {
    width: 40,
    height: 40,
  },
})

export default PeopleList