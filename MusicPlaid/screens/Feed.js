import { StyleSheet,ScrollView, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import React, { useContext, useState, useEffect } from 'react'
import { SearchBar } from 'react-native-elements';
import Header from '../components/Header'
import Post from '../components/Post'
import { POSTS } from '../data/posts';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Config from '../Config.js';
import { globalStyles } from '../styles/global';


const Feed = ({navigation}) => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [searchSongResults, setSearchSongResults] = useState([]);
  const [searchUserResults, setSearchuserResults] = useState([]);

  const handleSearch = async () => {
    setSearchuserResults([{'display_name': 'Loading...'}]);

      axios(`${Config.search}?q=${searchText}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "spotify-token": user.cached_token,
          Authorization: "Bearer " + user.cached_token,
        }
      }
      )
      .then((response) => {
        console.log('Response Data: ', response.data);
        if(response.data.songs.length > 0){
          setSearchSongResults(response.data.songs.slice(0,10));
        }else{
          setSearchSongResults([]);
        }

        if(response.data.users.length > 0){
          setSearchuserResults(response.data.users.slice(0,10));
        }else{
          setSearchuserResults([]);
        }

      }).catch((error) => { console.log(error) })
     
  };

  const renderMusic = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => {
                navigation.push('Music', { title: 'Song', id: item.id })
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, marginLeft: 10 }}>
        <Image source={{ uri: item.img_url }} style={styles.story} />
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{item.name}</Text>
                    </View>
                </View>
      </TouchableOpacity>
      
    </View>
  );

  const renderUsers = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => {
                navigation.push('Profile',{ id: item.id })
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, marginLeft: 10 }}>
        <Image source={{ uri: item.img_url }} style={styles.story} />
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{item.display_name}</Text>
                    </View>
                </View>
      </TouchableOpacity>
      
    </View>
  );

  const handleKeyPress = (key) => {
    if (key === 'Enter') {
      handleSearch();
    }
  };

  
useEffect(() => {
  let timerId = null;

  if (searchText) {
    timerId = setTimeout(() => {
      handleSearch();
    }, 1000); // Delay the search request by 1 second
  } else {
    setSearchSongResults([]);
    setSearchuserResults([]);
  }

  return () => {
    clearTimeout(timerId); // Clear the timer if component unmounts or searchText changes
  };
}, [searchText]);


  return (
    <SafeAreaView style={styles.container}>
        <Header/>
        <View style={{marginBottom: 20}}>
        <SearchBar
            onChangeText={(text) => setSearchText(text)}
            onCancel={() => setSearchText('')}
            onKeyPress={handleKeyPress}
            placeholder="Search music, profiles, and more..."
            value={searchText}
        />
      </View>
      {searchSongResults.length == 0 && searchUserResults.length == 0 ? (
         <ScrollView>
            {POSTS.map((post, index) => (
                <Post key={index} post={post}/>
            ))}
        </ScrollView>
      ):(
        <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 10}}>
          { searchSongResults.length > 0 && (
          <View>
            <Text style={[globalStyles.subHeaderText, {marginBottom: 10}]}>Tracks</Text>
            <FlatList
              data={searchSongResults}
              renderItem={renderMusic}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          )}

        { searchUserResults.length > 0 && (
          <View>
            <Text style={[globalStyles.subHeaderText, {marginBottom: 10}]}>Users</Text>
            <FlatList
              data={searchUserResults}
              renderItem={renderUsers}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        </View>
      )}
        <Footer/>
    </SafeAreaView>
      )
}


const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      flex: 1,
  },
  story: {
    width: 40,
    height: 40,
},
})

export default Feed