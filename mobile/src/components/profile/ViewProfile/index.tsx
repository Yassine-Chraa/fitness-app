import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import InfoGroup from '../InfoGroup';
import Screen from '../../Screen';
import { useNavigation } from '@react-navigation/native';
import ProgressSwipper from './ProgressSwipper';
import PostTemplate from '../../PostTemplate';
import { usePost } from '../../../context/providers/PostContextProvider';
import PostInput from '../../PostTemplate/PostInput';
import { useAuth } from '../../../context/providers/AuthContextProvider';



const ViewProfile = ({ route }: any): JSX.Element => {
    const navigation: any = useNavigation();
    const [posts, setPosts] = useState<any>();
    const { getPostsByUserId } = usePost();
    const { currentUser } = useAuth();
    const user = currentUser?.user;

    const { user_id } = route.params;

    const titles = ['150', '0.0', '22.14']
    const values = ['weight LBS', 'Body fat %', 'BMI']

    const loadPosts = async () => {
        const posts = await getPostsByUserId(user_id);
        if (posts) {
            setPosts(() => posts);
        }
    }
    useEffect(() => {
        loadPosts();
    }, [])

    return (
        <Screen name={"Profile"} backButton allowScroll>
            <View style={styles.header}>
                <Image source={{ uri: user?.profile }}
                    style={styles.headerImage} />
                <Text style={{ fontSize: 24, color: '#000', fontWeight: '600', textAlign: 'center' }}>Yassine Chraa</Text>
                <InfoGroup titles={titles} values={values} />
            </View>

            <View style={styles.topButton}>
                <Button title={true ? 'Edit Profile' : 'Add friend'}
                    onPress={() => navigation.navigate('EditProfile')} />
            </View>

            <ProgressSwipper user_id={user_id} title={'Progress Photos'}
                imageStyle={{ width: 70, height: 70, borderRadius: 8 }} />


            <PostInput currentUserImgUrl={user?.img_url} user_id={user_id} reLoadPosts={loadPosts} />

            {
                posts && posts.length >= 1 && posts.map((p: any) => <PostTemplate post={p} key={p.id + p.image_url} />)
            }

        </Screen>
    );
};

export default ViewProfile;

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 4
    },
    headerImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 6,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#0006",
        backgroundColor: "#eee"
    },
    topButton: {
        borderRadius: 6,
        overflow: 'hidden',
    },


});