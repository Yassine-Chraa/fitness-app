import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import InfoGroup from '../InfoGroup';
import Screen from '../../Screen';
import { useNavigation } from '@react-navigation/native';
import AchievmentsSwipper from './AchievmentsSwipper';
import ProgressSwipper from './ProgressSwipper';
import PostTemplate from '../../PostTemplate';
import { usePost } from '../../../context/providers/PostContextProvider';
import PostInput from '../../PostTemplate/PostInput';
import { useAuth } from '../../../context/providers/AuthContextProvider';


const imageTest = require('../../../assets/images/gym.jpg')

const ViewProfile = ({ route }: any): JSX.Element => {
    const navigation: any = useNavigation();
    const [posts, setPosts] = useState<any>();
    const { getPostsByUserId } = usePost();
    const { currentUser } = useAuth();
    const user = currentUser?.user;

    const { user_id } = route.params;


    const badgets = [
        { title: 'Beginner', image: require('../../../assets/images/budges/budge_1.png') },
        { title: 'Novice', image: require('../../../assets/images/budges/budge_2.png') },
        { title: 'Intermediate', image: require('../../../assets/images/budges/budge_3.png') },
        { title: 'Advanced', image: require('../../../assets/images/budges/budge_4.png') },
        { title: 'Expert', image: require('../../../assets/images/budges/budge_5.png') },
        { title: 'Legendary', image: require('../../../assets/images/budges/budge_6.png') },
        { title: 'intermediare', image: require('../../../assets/images/budges/budge_7.png') },
        { title: 'Master', image: require('../../../assets/images/budges/budge_8.png') },
        { title: 'Grandmaster', image: require('../../../assets/images/budges/budge_9.png') },
    ];

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

    const reLoadPosts = () => {
        loadPosts();
    }

    return (
        <Screen name={"Profile"} backButton allowScroll>

            <View style={styles.header}>
                <Image source={{ uri: user?.img_url }}
                    style={styles.headerImage} />

                <View style={styles.follow}>
                    <View style={styles.followItem}>
                        <Text style={styles.followValue}>100</Text>
                        <Text style={styles.followLabel}>Followers</Text>
                    </View>
                    <View style={styles.followItem}>
                        <Text style={styles.followValue}>130</Text>
                        <Text style={styles.followLabel}>Following</Text>
                    </View>
                    <View style={styles.followItem}>
                        <Text style={styles.followValue}>340</Text>
                        <Text style={styles.followLabel}>Score</Text>
                    </View>
                </View>
            </View>

            <View style={styles.topButton}>
                <Button title={true ? 'Edit Profile' : 'Add friend'}
                    onPress={() => navigation.navigate('EditProfile')} />
            </View>

            <AchievmentsSwipper title={'Achievements'} badgets={badgets} imageStyle={{ width: 70, height: 70, borderRadius: 35 }} />

            <ProgressSwipper user_id={user_id} title={'Progress Photos'}
                imageStyle={{ width: 70, height: 70, borderRadius: 8 }} />

            <InfoGroup titles={titles} values={values} />

            <PostInput currentUserImgUrl={user?.img_url} user_id={user_id} reLoadPosts={reLoadPosts} />

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
        marginBottom: 14
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
    follow: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    followItem: {
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    followValue: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: 'blue',
    },
    followLabel: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400'
    },
    topButton: {
        borderRadius: 6,
        overflow: 'hidden',
    },


});