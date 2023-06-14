import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import axios from 'axios';
import Config from '../Config.js';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import Header from '../components/Header'
import { globalStyles } from '../styles/global';
import Footer from '../components/Footer.js';
import PeopleList from '../components/PeopleList';


const Music = ({ navigation, route }) => {
  const [songData, setSongData] = React.useState(null);

  console.log('Song route params', route)

  const renderListeners = ({ item }) => {
    return (<Text style={globalStyles.text}>{item.display_name}</Text>)
  }

  React.useEffect(() => {
    console.log('Song route id', route.params.id)
    const songId = route.params.id;
    axios(`${Config.songDataUrl}?id=${songId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }
    )
      .then((response) => {
        console.log('Song Data: ', response.data);
        setSongData(response.data);
      }).catch((error) => { console.log(error) })
  }, [])

  if (songData == null) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View>
          <Text style={globalStyles.text}>Loading Song...</Text>
        </View>
      </SafeAreaView>
    )
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>

          <Image source={songData.song.img_url} style={styles.story} />
          <Text style={styles.textSongName}>{songData.song.name}</Text>
          <Text style={styles.textArtist}>{songData.artists[0].name}</Text>
        </View>

        <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 10 }}>
          <Text style={globalStyles.subHeaderText}>Listeners</Text>
          <PeopleList people={songData.listeners} navigation={navigation} />
        </View>

        {/* <Text style={styles.text}>Likes</Text>
            <Text style={styles.text}>Comments</Text> */}``
        </View>
      <Footer />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  textSongName: { color: 'white', fontSize: 18, marginTop: 10, fontWeight: 'bold' },
  textArtist: { color: 'white', fontSize: 18, marginTop: 10 },
  story: {
    width: 150,
    height: 150,
    borderWidth: 3,
    borderColor: 'white',
    margin: 30,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
})

export default Music