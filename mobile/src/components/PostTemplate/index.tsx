import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import PostBody from './PostBody';
import ListComments from './ListComments';
import InputComment from './ListComments/InputComment';
import { useComment } from '../../context/providers/CommentContextProvider';
import CommentType from '../../types/CommentType';

const PostTemplate = ({ post }: any): JSX.Element => {

    const [showComments, setShowComments] = useState(false);
    const [showNewCommentInput, setShowNewCommentInput] = useState(false);
    const [comments, setComments] = useState<any>();
    const { getCommentsByPostId } = useComment();
    const [post_id, setPost_id] = useState<any>();
    const [user_id, setUser_id] = useState<any>();
    const {addComment} = useComment();


    const sendCommentHandler = async (text: any) => {
        const comment: CommentType = {
            content: text,
            post_id: post_id,
            user_id: user_id,
        }
        const result = await addComment(comment);
        if(result){
            setShowNewCommentInput(() => false)
            loadComments();
        }
    }

    const loadComments = async () => {
        const comments = await getCommentsByPostId(post_id);
        if (comments) {
            setComments(() => comments);
        }
    }

    useEffect(() => {
        setPost_id(() => post.id);
        setUser_id(() => post.user.id)
        loadComments();
    }, [post_id])

    return (
        <View style={styles.container}>
            <PostBody
                post={post}
                nbrComments={comments && comments.length}
                setShowComments={setShowComments}
                showComments={showComments}
                setShowNewCommentInput={setShowNewCommentInput}
            />

            {showNewCommentInput &&
                <InputComment sendCommentHandler={sendCommentHandler} />
            }
            {showComments &&
                <ListComments comments={comments} />
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