import React, { useState, useEffect } from 'react';
import { Modal, Text, View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useReaction } from '../../context/providers/ReactionContextProvider';
import moment from 'moment';

const ListOfLikers = ({ post_id, setIsLikersVisible, isLikersVisible }: any) => {
    const [reactions, setReactions] = useState<any>();
    const { getReactionsByPostId } = useReaction();

    const hideModal = () => {
        setIsLikersVisible(false);
    };

    useEffect(() => {
        const fetchReactions = async () => {
            const data = await getReactionsByPostId(post_id);
            if (data) {
                setReactions(data);
            }
        };
        fetchReactions();
    }, []);



    return (
        <Modal visible={isLikersVisible}
            animationType="slide"
            transparent={true} onRequestClose={hideModal}>
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={hideModal}
                        activeOpacity={0.6}
                        style={styles.modalButtonCancel}>
                        <Text style={styles.modalButtonCancelText}>X</Text>
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>List of Reactors</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        {reactions && reactions.length > 0 ? reactions.map((reaction: any) => (
                            <View style={styles.Usercontainer} key={reaction.id}>
                                <Image source={{ uri: reaction.user.img_url }} style={styles.userAvatar} />
                                <View>
                                    <Text style={styles.userName}>{reaction.user.name}</Text>
                                    <Text style={styles.reactionTime}>{moment(reaction.user.created_at).fromNow()}</Text>
                                </View>
                            </View>
                        )) :
                            <View style={styles.noReactionContainer}>
                                <Text style={styles.noReactions}>Success is not final, failure is not fatal: It is the courage to continue that counts.</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default ListOfLikers;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 40,
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    modalButtonCancel: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff6666ff',
        borderRadius: 16,
        margin: 3,
    },
    modalButtonCancelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    Usercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        backgroundColor: '#ddd9',
        padding: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0003',
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    reactionTime: {
        marginLeft: 'auto',
        fontStyle: 'italic',
    },
    titleContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    noReactionContainer: {
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noReactions: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        lineHeight: 28,
        fontStyle: 'italic',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,

    }
});