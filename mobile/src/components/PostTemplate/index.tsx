import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PostBody from './PostBody';
import ListComments from './ListComments';
import InputComment from './ListComments/InputComment';

const PostTemplate = (): JSX.Element => {
    const fakeComments = [
        {
            id: 1,
            username: 'john_doe',
            text: 'This is the first comment! This is the first comment! This is the first comment! This is the first comment! This is the first comment! This is the first comment! This is the first comment!',
            image: 'https://picsum.photos/200/300',
            replies: [
                {
                    id: 1,
                    username: 'jane_doe',
                    text: 'Thanks for the comment, John!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 2,
                    username: 'joe_smith',
                    text: 'I agree with John, great post!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 3,
                    username: 'joe_smith',
                    text: 'I agree with John, great post!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 4,
                    username: 'joe_smith',
                    text: 'I agree with John, great post!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 5,
                    username: 'joe_smith',
                    text: 'I agree with John, great post!',
                    image: 'https://picsum.photos/200/300'
                }
            ]
        },
        {
            id: 2,
            username: 'jane_doe',
            text: 'This is the second comment!',
            image: 'https://picsum.photos/200/300',
            replies: [
                {
                    id: 1,
                    username: 'john_doe',
                    text: 'Thanks for the comment, Jane!',
                    image: 'https://picsum.photos/200/300'
                }
            ]
        },
        {
            id: 3,
            username: 'jane_doe',
            text: 'This is the second comment!',
            image: 'https://picsum.photos/200/300',
            replies: [
                {
                    id: 1,
                    username: 'john_doe',
                    text: 'Thanks for the comment, Jane!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 2,
                    username: 'john_doe',
                    text: 'Thanks for the comment, Jane!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 3,
                    username: 'john_doe',
                    text: 'Thanks for the comment, Jane!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 4,
                    username: 'john_doe',
                    text: 'Thanks for the comment, Jane!',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 5,
                    username: 'john_doe',
                    text: 'Thanks for the comment, Jane!',
                    image: 'https://picsum.photos/200/300'
                }
            ]
        }
    ];

    const [showComments, setShowComments] = useState(false);
    const [showNewCommentInput, setShowNewCommentInput] = useState(false);
    const [newComment, setNewComment] = useState('');

    const NewCommentHandler = (text: any) => {
        setNewComment(() => text)
    }

    const togggleShowComments = () => {
        setShowComments((prev) => !prev);
    }

    return (
        <View style={styles.container}>
            <PostBody nbrComments={fakeComments.length}
                setShowComments={setShowComments}
                showComments={showComments}
                setShowNewCommentInput={setShowNewCommentInput}
            />

            {showNewCommentInput &&
                <InputComment onComment={NewCommentHandler} />
            }
            {showComments &&
                <ListComments comments={fakeComments} />
            }
        </View>
    )
}

export default PostTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})