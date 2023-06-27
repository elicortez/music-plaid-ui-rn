import { StyleSheet,ScrollView, Text, View } from 'react-native'
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import React, { useContext, useState } from 'react'
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header'
import Post from '../components/Post'
import { POSTS } from '../data/posts';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
        <Header/>
        <View style={{marginBottom: 20}}>
        <SearchBar
            onChangeText={(text) => setSearchText(text)}
            onCancel={() => setSearchText('')}
            placeholder="Search music, profiles, and more..."
            value={searchText}
        />
      </View>
         <ScrollView>
            {POSTS.map((post, index) => (
                <Post key={index} post={post}/>
            ))}
        </ScrollView>
        <Footer/>
    </SafeAreaView>
      )
}


const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      flex: 1,
  },
})

export default Feed