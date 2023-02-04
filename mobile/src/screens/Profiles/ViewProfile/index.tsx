import React from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import InfoGroup from '../UserProfile/InfoGroup';
import LittleSwipper from './LittleSwipper';
import PostCard from './PostCard';

const ViewProfile = (): JSX.Element => {
    const badgets = [
        require('../../../assets/images/slider/image1.png'),
        require('../../../assets/images/slider/image2.png'),
        require('../../../assets/images/slider/image3.png'),
        require('../../../assets/images/slider/image4.png'),
        require('../../../assets/images/slider/image1.png'),
        require('../../../assets/images/slider/image2.png'),
        require('../../../assets/images/slider/image3.png'),
        require('../../../assets/images/slider/image4.png'),
        require('../../../assets/images/slider/image1.png'),
        require('../../../assets/images/slider/image2.png'),
        require('../../../assets/images/slider/image3.png'),
        require('../../../assets/images/slider/image4.png'),
    ];

    const titles = ['150', '0.0', '22.14']
    const values = ['weight LBS', 'Body fat %', 'BMI']

    return (
        <ScrollView>
            <View style={styles.header}>
                <Image source={require('../../../assets/images/gym.jpg')} style={styles.headerImage} />

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
            {/* -----------------( add or edit button )----------------- */}
            <View style={styles.topButton}>
                <Button title={true ? 'Edit Profile' : 'Add friend'} />
            </View>
            {/* -----------------( achievements )----------------- */}
            <LittleSwipper title={'Achievements'} images={badgets} imageStyle={{ width: 70, height: 70, borderRadius: 35 }} />
            {/* -----------------( progress photos )----------------- */}
            <LittleSwipper title={'Progress Photos'} images={badgets} imageStyle={{ width: 70, height: 70, borderRadius: 8 }} />
            {/* -----------------( some statistics )----------------- */}
            <InfoGroup titles={titles} values={values} />
            {/* -----------------( posts here )----------------- */}
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </ScrollView>
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
        width: 70,
        height: 70,
        borderRadius: 35,
        marginTop: 10,
        marginBottom: 14
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