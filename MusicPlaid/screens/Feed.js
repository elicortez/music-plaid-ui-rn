import { View, Text, StyleSheet,ScrollView } from 'react-native'
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import React from 'react'
import Header from '../components/Header'
import Post from '../components/Post'
import { POSTS } from '../data/posts';
import BottomTabs, {bottomTabsIcons} from '../components/BottomTabs';

const Feed = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Header/>
         <ScrollView>
            {POSTS.map((post, index) => (
                <Post key={index} post={post}/>
            ))}
        </ScrollView>
        
        <BottomTabs icons={bottomTabsIcons}/>
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