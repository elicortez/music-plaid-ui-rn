import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'

const Post = ({post}) => {
  return (
    <View style={{marginBottom: 30}}>
        <Divider width={1} orientation="vertical" />
        <PostHeader post={post}/>
        <PostImage post={post}/>
        <View style={{marginHorizontal: 5, marginTop: 10}}>
            <PostFooter/>
            <Likes post={post}/>
            <Caption post={post}/>
            <CommentsSection post={post}/>
        </View>
        
    </View>
  )
}

const PostHeader =({post}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: post.profile_picture}} style={styles.story} />
            <Text style={{color: 'white', marginLeft: 5, fontWeight: '700'}}>{post.user}</Text>
        </View>
        <Text style={{color: 'white', fontWeight: '900'}}>...</Text>
    </View>
)


const PostImage = ({post}) => (
<View style={{ width: '100%', height: 120, alignItems: 'center', justifyContent: 'center' }}>
  <Image source={{ uri: post.imageUrl }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
  <View style={styles.overlay}>
    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>
      Smells like teen spirit 🎸
    </Text>
  </View>
</View>


)


const PostFooter = () => (
    <View style = {{flexDirection: 'row'}}>
        <View style={styles.leftFooterIcons}>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
            <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl} />
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}} >
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
        </View>
    </View>
)


const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image source={{uri: imgUrl}} style={imgStyle} />
    </TouchableOpacity>
)

const Likes = ({post}) => (
    <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color: 'white', fontWeight: '600', fontSize: 13, margin: 3}}>
        {post.likes.toLocaleString('en')} likes
    </Text>
    </View>
)

const Caption = ({post}) => (
    <View style={{marginTop: 5}}>
        <Text style={{color: 'white', fontSize: 13, margin: 3}}>
            <Text style={{fontWeight: '600'}}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
    
)

const CommentsSection = ({post}) => (
    <View style={{marginTop: 5}}>
        {post.comments.map((comment, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', fontSize: 13, margin: 3}}>
                    <Text style={{fontWeight: '600'}}>{comment.user}</Text>
                    <Text> {comment.comment}</Text>
                </Text>
            </View>
        ))}
    </View>
)



const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
        likedImageUrl: 'https://img.icons8.com/ios-filled/50/fa314a/like--v1.png',
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/topic.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/forward-arrow.png',
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon.png',
    },
]



const styles = StyleSheet.create({
    story: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1,
        borderColor: 'white',
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    leftFooterIcons: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
    },
    shareIcon: {
        transform: [{rotate: '320deg'}],
        marginTop: -3,
    },
    overlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 8,
        left: '50%',
        top: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
      },
})




export default Post