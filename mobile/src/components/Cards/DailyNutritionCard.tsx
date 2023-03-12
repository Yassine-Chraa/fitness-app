import { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DailyNutritionCard = ({ item }: any) => {
    const navigation: any = useNavigation();
    const { name, api_id, poid, energy, protein } = item;
    const [foodDetails, setFoodDetails] = useState(Object);
    const fetchData = () => {
        axios
            .get(
                `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${api_id}`,
                {
                    headers: {
                        'X-RapidAPI-Key':
                            '30b507191fmshf1309fbc3a2421ap1d2007jsn670e526d79e4',
                        'X-RapidAPI-Host':
                            'edamam-food-and-grocery-database.p.rapidapi.com',
                    },
                },
            ).then((response) => {
                setFoodDetails(response.data.hints[0].food);

            })
    }
    useEffect(() => {
        fetchData();
    }, [api_id])
    console.log(foodDetails)
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.4}
            onPress={() =>
                navigation.navigate('FoodDetails', {
                    type: 'daily_nutrition',
                    item: foodDetails,
                    poid
                    
                })
            }>
            <View
                style={{
                    flexDirection: 'row',
                    columnGap: 12,
                    width: '90%',
                }}>
                <View style={styles.itemDesc}>
                    <Text
                        style={{
                            color: theme.colors.text,
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>
                        {name}
                    </Text>
                    <View style={{ flexDirection: 'row', columnGap: 6 }}>
                        <View style={styles.tag}>
                            <Text style={{ fontSize: 13 }}>
                                Poid: {poid.toFixed(1) + ' g'}
                            </Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={{ fontSize: 13 }}>
                                Cal: {energy + ' kcal'}
                            </Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={{ fontSize: 13 }}>
                                Protein: {protein.toFixed(2) + ' g'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: theme.colors.button, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
                activeOpacity={0.4}>
                <Icon name="trash" size={16} color={'#fff'} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4,
        marginBottom: 20,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: theme.colors.background,
    },
    itemDesc: {
        rowGap: 8,
        width: '70%',
        justifyContent: 'space-between',
    },
    tag: {
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: theme.colors.statusBar,
    },
});
export default DailyNutritionCard;
