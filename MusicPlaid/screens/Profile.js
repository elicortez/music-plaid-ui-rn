//import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet,ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Stories from '../components/Stories'
import Post from '../components/Post'
import { POSTS } from '../data/posts';
import BottomTabs, {bottomTabsIcons} from '../components/BottomTabs';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Header/>
        <Stories/>
        <ScrollView>
            {POSTS.map((post, index) => (
                <Post key={index} post={post}/>
            ))}
        </ScrollView>
        <BottomTabs icons={bottomTabsIcons}/>
    </SafeAreaView>
    /*<SafeAreaView style={styles.container}>
     <Header/>
    </SafeAreaView>*/
  )
}


const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      flex: 1,
  },
})

export default Profile