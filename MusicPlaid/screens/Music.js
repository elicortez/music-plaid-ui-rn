import { View, Text, StyleSheet, Image, FlatList, Linking, TouchableOpacity, Button, TextInput } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios';
import Config from '../Config.js';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import Header from '../components/Header'
import { globalStyles } from '../styles/global';
import Footer from '../components/Footer.js';
import PeopleList from '../components/PeopleList';
// import SpotifyPlayer from 'react-spotify-web-playback';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';

const Music = ({ navigation, route }) => {
  const [songData, setSongData] = useState(null);
  const [liked, setLiked] = useState(false);
  const {userData} = useContext(AuthContext);
  const [userComment, setUserComment] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [shownComments, setShownComments] = useState([]);


  const handlePersonPressed = (id) => {
    navigation.push('Profile', { id: id })
  };

  console.log('Song route params', route)

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <TouchableOpacity onPress={() => handlePersonPressed(item.user_id)}>
        <Text style={styles.userIdText}>{item.display_name}</Text>
      </TouchableOpacity>
      <Text style={styles.commentText}>{item.comment_text}</Text>
    </View>
  );

  useEffect(() => {
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
        if (response.data.likers.some(liker => liker.id === userData.user.id)) {
          setLiked(true);
        }

        if (response.data.comments) {
          setShownComments(response.data.comments.slice(0, 10));
        }

        
        console.log('Like Response:', liked);
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

  const handlePlayButtonPress = () => {
    const songId = songData.song.spotify_id;
    Linking.openURL(`https://open.spotify.com/track/${songId}`);

  };

  const handleLike = () => {
    const songId = songData.song.id;
    let url = `${Config.likeSongUrl}?id=${songId}`;
    if (liked) {
      url = `${Config.unlikeSongUrl}?id=${songId}`;
    }

    setLiked(!liked);

    axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "spotify-token": userData.user.cached_token,
        Authorization: "Bearer " + userData.user.cached_token,
      }
    }
    )
    .then((response) => {
      console.log('Url: ', url);
      console.log('Response Data: ', response.data);
    }).catch((error) => { console.log(error) })

  };

  const handleCommentChange = (text) => {
    setUserComment(text);
  };
  
  const handleCommentSubmit = () => {
    // Perform actions with the submitted comment (e.g., send to server, update state, etc.)
    console.log('Submitted comment:', userComment);

    axios(`${Config.add_comment_url}?song_id=${songData.song.id}&user_id=${userData.user.id}&comment=${userComment}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "spotify-token": userData.user.cached_token,
        Authorization: "Bearer " + userData.user.cached_token,
      }
    }
    )
    .then((response) => {
      console.log('Response Data: ', response.data);
    }).catch((error) => { console.log(error) })

    // Create a new comment object with a temporary ID
    const newComment = {
      comment_id: Date.now(), // Temporary ID (can be replaced with a unique ID from the server)
      comment_text: userComment,
      display_name: userData.user.display_name,
      user_id: userData.user.id,
    };

    console.log('Shown comments:', shownComments);

    // Append the new comment to the shown comments
    const updatedComments = [...shownComments, newComment];
    setShownComments(updatedComments);

    setUserComment('');
    setShowTextInput(false); // Hide the text input after submitting

    console.log('Updated comments:', updatedComments);
  };

  const handleCommentImagePress = () => {
    setShowTextInput(true);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>

          <Image source={songData.song.img_url} style={styles.story} />
          <Text style={styles.textSongName}>{songData.song.name}</Text>
          <Text style={styles.textArtist}>{songData.artists[0].name}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={handlePlayButtonPress} style={styles.playButton}>
              <Text style={styles.playButtonText}>Play on Spotify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLike()}>
            <Image
              style={styles.footerIcon}
              source={{
                uri: liked
                ? 'https://img.icons8.com/ios-filled/60/E74C3C/like.png'
                : 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
              }}
            />
            </TouchableOpacity>
          </View>

          {/* <SpotifyPlayer token={user} uris={[`spotify:track:${songData.song.spotify_id}`]}/> */}
        </View>

        <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 10 }}>
          <Text style={globalStyles.subHeaderText}>Recent Listeners</Text>
          <PeopleList people={songData.listeners} navigation={navigation} />
        </View>

        <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 10 }}>
          <Text style={globalStyles.subHeaderText}>Liked By</Text>
          <PeopleList people={songData.likers} navigation={navigation} />
        </View>

        <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 10}}>
          <View>
            <Text style={[globalStyles.subHeaderText, {marginBottom: 10}]}>Comments</Text>
            <FlatList
              data={shownComments}
              renderItem={renderComment}
              keyExtractor={item => item.comment_id.toString()}
            />
          </View>

          {!showTextInput && (
            <TouchableOpacity onPress={handleCommentImagePress}>
              <Image style={styles.footerIcon} source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/topic.png' }} />
            </TouchableOpacity>
          )}
          {showTextInput && (
            <View>
              <TextInput
                  style={{backgroundColor: 'white', padding: 10,  height: 100, width: 200, marginBottom: 10 }}
                  placeholder="Type your comment here"
                  value={userComment}
                  onChangeText={handleCommentChange}
                  multiline={true}
                  numberOfLines={3}
                />
                <Button title="Submit" 
                onPress={handleCommentSubmit}
                />
            </View>
          )}
          
        </View>
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
  playButton: {
    backgroundColor: '#1DB954', // Spotify green
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
  },
  playButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerIcon: {
    height: 33,
    width: 33,
    marginTop: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userIdText: {
    fontWeight: 'bold',
    marginRight: 4,
    color: 'white',
  },
  commentText: {
    color: 'white',
  },
})

export default Music