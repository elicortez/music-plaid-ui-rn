import { StyleSheet,ScrollView, Text } from 'react-native'
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import Post from '../components/Post'
import { POSTS } from '../data/posts';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';

const Feed = () => {
  const { user } = useContext(AuthContext);
  

  return (
    <SafeAreaView style={styles.container}>
        <Header/>
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