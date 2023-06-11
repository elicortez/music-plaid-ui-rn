import { View, Text } from 'react-native'
import React from 'react'
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'

const PeopleList = ({navigation, route}) => {
  console.log('people route', route)
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{color: 'white', fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>{route.params.title}</Text>
      </View>
      <View style={{ alignItems: 'left' }}>
      {route.params.people.map((person, index) => (
        <View key={index} style={{alignItems: 'left'}}>
        <Text style={{color: 'white', fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>{person.display_name}</Text>
        </View>
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