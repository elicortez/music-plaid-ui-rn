import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'


const PeopleList = ({ people, navigation }) => {

  const handlePersonPressed = (id) => {
    navigation.push('Profile', { id: id })
  }

  // TODO: Use a FlatList react component instead of a map
  return (
    <View style={{ alignItems: 'flex-start' }}>
      {people.map((person, index) => (
        <TouchableOpacity key={index} onPress={() => handlePersonPressed(person.id)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <Image source={{ uri: person.img_url }} style={styles.imageThumbnail} />
            <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{person.display_name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  imageThumbnail: {
    width: 40,
    height: 40,
  },
})

export default PeopleList