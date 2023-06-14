import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import Header from '../components/Header'
import { globalStyles } from '../styles/global';
import Footer from '../components/Footer';
import PeopleList from '../components/PeopleList';

const PeopleListScreen = ({ navigation, route }) => {
  console.log('people route params', route.params)

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{route.params.title}</Text>
      </View>
      <PeopleList people={route.params.people} navigation={navigation} />
      <Footer />
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

export default PeopleListScreen