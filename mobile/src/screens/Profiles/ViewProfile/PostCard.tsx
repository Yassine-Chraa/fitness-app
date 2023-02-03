import React from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PostCard = (): JSX.Element => {

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.postHeaderImgName}>
                    <Image style={styles.postHeaderImage} source={require('../../../assets/images/gym.jpg')} />
                    <View style={styles.postHeaderTitle}>
                        <Text style={styles.postHeaderTitleName}>Ben alla Ismail</Text>
                        <Text style={styles.sinceTexxt}>3 days ago</Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <Icon name={'more-vertical'} size={14} color={'#000'} />
                </TouchableOpacity>
            </View>
            <View style={styles.postBody}>
                <Text style={styles.postBodyText}>
                    something about your post here ...
                </Text>
                <Image style={styles.postBodyImage} source={require('../../../assets/images/gym.jpg')} />
            </View>
            <View style={styles.postFooter}>
                <View style={styles.postFooterIcon}>
                    <Icon name={'heart'} size={24} style={{ marginEnd: 6 }} />
                    <Text>21</Text>
                </View>
                <View style={styles.postFooterIcon}>
                    <Icon name={'comment'} size={24} style={{ marginEnd: 6 }} />
                    <Text>21</Text>
                </View>
            </View>
        </View>
    )
}

export default PostCard;

const styles = StyleSheet.create({
    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingStart: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postBody: {
        width: '100%',
    },
    postHeaderImgName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
    },
    postHeaderImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    postHeaderTitle: {
        marginLeft: 16,
    },
    postHeaderTitleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222'
    },
    sinceTexxt: {
        fontSize: 13,
    },
    postBodyText: {
        paddingBottom: 12,
    },
    postBodyImage: {
        width: '100%',
        height: 240,
        borderRadius: 4,
    },
    postFooter: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
    },
    postFooterIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 20,
    }
})