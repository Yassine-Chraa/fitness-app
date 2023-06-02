import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, Modal, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import Swiper from 'react-native-swiper';
import theme from '../../constants/theme';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { Button } from '@rneui/base';
import axios from '../../Helpers/axiosConfig'
import { useDailyNutrition } from '../../context/providers/DailyNutritionProvider';


const Statistics = ({ user }: any): JSX.Element => {
    const { getUserWeights, weights, addUserWeight, editUserWeight, deleteUserWeight } = useAuth();
    const { getLastNutritions, getDailyNutrition, lastNuritions, dailyNutrition, forceUpdate } = useDailyNutrition();
    const cardWidth = Dimensions.get('window').width - 56;


    const [BMR, setBMR] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [weight, setWeight] = useState('')
    const [now, setNow] = useState('')
    const [editMode, setEditMode] = useState(false)

    const setCurrentDate = () => {
        const now = new Date();
        const date = `${now.getFullYear()}-${now.getMonth() < 9 ? '0' : ''}${now.getMonth() + 1}-${now.getDate() < 10 ? '0' : ''}${now.getDate()}`;
        setNow(date);
    }
    const getDailyCalory = async () => {
        if (typeof user.birth_date == 'string') {
            var dob = new Date(user.birth_date)
            var month_diff = Date.now() - dob.getTime();
            var age_dt = new Date(month_diff);
            var year = age_dt.getUTCFullYear();
            var age = Math.abs(year - 1970);
            const options = {
                method: 'GET',
                url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
                params: {
                    age,
                    gender: 'male',
                    height: user.height*100,
                    weight: user.weight,
                    activitylevel: 'level_1'
                },
                headers: {
                    'X-RapidAPI-Key': '30b507191fmshf1309fbc3a2421ap1d2007jsn670e526d79e4',
                    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
                }
            };

            try {
                const { data } = await axios.request(options);
                setBMR(data.data.BMR);
            } catch (e) {
                console.log(e)
            }
        }
    }
    const fetchData = async () => {
        await getDailyCalory();
        await getDailyNutrition(user.id, now);
        await getUserWeights(user.id);
        await getLastNutritions(user.id);
    }
    const addWeight = async () => {
        if (user) {
            try {
                await addUserWeight(user.id, Number(weight), now);
                setWeight('')
                setShowModal(false);
                await getUserWeights(user.id);
            } catch (e) {
                console.log(e)
            }
        }
    }
    const editWeight = async () => {
        if (user) {
            try {
                await editUserWeight(user.id, Number(weight), now);
                setWeight('')
                setShowModal(false);
                await getUserWeights(user.id);
            } catch (e) {
                console.log(e)
            }
        }
    }
    const deleteWeight = async () => {
        try {
            await deleteUserWeight(user.id, now);
            setWeight('')
            setShowModal(false);
            await getUserWeights(user.id);
        } catch (e) {
            console.log(e)
        }
    }
    const firstWeight = () => {
        const temp = new Date(user.created_at);
        const ret = `${temp.getDate() < 10 ? '0' : ''}${temp.getDate()}/${temp.getMonth() < 9 ? '0' : ''}${temp.getMonth() + 1}`
        return ret;
    }

    useEffect(() => {
        setCurrentDate()
        fetchData()
    }, [axios.defaults.headers.common[
        "authorization"
    ]])

    useEffect(() => {
        const temp = weights?.find(weight => {
            return weight.date === now;
        });
        setEditMode(temp ? true : false);
    }, [weights])

    return (
        <View style={styles.StatisticsContainer}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.subtitle}>Calories (cal)</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <PieChart
                        paddingLeft='0'
                        data={[
                            {
                                name: 'Daily Calory',
                                calories: BMR | 0,
                                color: theme.colors.secondary,
                                legendFontColor: theme.colors.text,
                                legendFontSize: 14,
                            },
                            {
                                name: 'Food',
                                calories: dailyNutrition?.energy_consumed | 0,
                                color: theme.colors.primary,
                                legendFontColor: theme.colors.text,
                                legendFontSize: 14,
                            },
                            
                        ]}
                        width={cardWidth}
                        height={180}
                        chartConfig={{
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="calories"
                        backgroundColor="transparent"
                        absolute
                    />
                </View>
            </View>

            <Swiper
                style={{ height: 325 }}
                loop={false}
                activeDotColor={theme.colors.primary}>
                <View style={styles.card}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={styles.subtitle}>Weight</Text>
                        <Pressable onPress={() => {
                            const temp = weights.find(weight => {
                                return weight.date === now;
                            });
                            console.log(temp)
                            if (temp) setWeight(temp.value.toFixed(1).toString())
                            setShowModal(true)
                        }}><Icon name={editMode ? "edit" : "plus"} color={theme.colors.text} size={18} /></Pressable>
                    </View>
                    <View>
                        <LineChart
                            data={{
                                labels: weights.length != 0 ? [...weights, { value: user.weight, date: user.created_at }].map((weight) => {
                                    const temp = new Date(weight.date);
                                    const date = `${temp.getDate() < 10 ? '0' : ''}${temp.getDate()}/${temp.getMonth() < 9 ? '0' : ''}${temp.getMonth() + 1}`
                                    return date;
                                }) : [firstWeight()],
                                datasets: [
                                    {
                                        data: weights.length != 0 ? [...weights, { value: user.weight, date: user.created_at }].map((weight) => {
                                            return weight.value;
                                        }) : [user.weight],
                                        strokeWidth: 1.5,
                                    },
                                ],
                            }}
                            width={cardWidth}
                            height={200}
                            chartConfig={{
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            withDots={false}
                            transparent
                            bezier
                            withVerticalLines={false}
                            segments={2}
                        />
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.subtitle}>Energy Consumed</Text>
                    <View>
                        <BarChart
                            yAxisLabel=''
                            yAxisSuffix=''
                            data={{
                                labels: lastNuritions && lastNuritions.length > 0 ? lastNuritions.map((item: any) => {
                                    return `${item.date.substring(8, 10)}/${item.date.substring(5, 7)}`;
                                }) : ['20/05','21/05','22/05','23/05','24/05','25/05','26/05'],
                                datasets: [
                                    {
                                        data: lastNuritions && lastNuritions.length > 0 ? lastNuritions.map((item) => {
                                            return item.energy_consumed;
                                        }) : [1800,1600,2000,1700,2200,1500,1900],
                                    },
                                ],
                            }}
                            fromZero
                            width={cardWidth}
                            height={200}
                            chartConfig={{
                                backgroundGradientFrom: theme.colors.background,
                                backgroundGradientTo: theme.colors.background,
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                barPercentage: 0.5,
                            }}
                            showBarTops={false}
                            withInnerLines={false}
                        />
                    </View>
                </View>
            </Swiper>
            <Modal animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.modal}>
                    <Pressable style={{ position: 'absolute', right: 8, top: 8 }} onPress={() => setShowModal(false)}><Icon name="times" color={theme.colors.text} size={18} /></Pressable>
                    <Text style={{ fontSize: 20, color: theme.colors.text, fontWeight: 'bold' }}>{editMode ? "Edit" : "Add"} Weight</Text>
                    <TextInput keyboardType="numeric"
                        placeholder='weight (kg)'
                        style={styles.input}
                        value={weight + ""}
                        inputMode={"numeric"}
                        onChangeText={(val: any) => setWeight(() => val)} />
                    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                        <View style={{ width: editMode ? '40%' : '100%' }}><Button radius={5} onPress={() => editMode ? editWeight() : addWeight()}>{editMode ? "Edit" : "Add"}</Button></View>
                        {editMode ? (<View style={{ width: '40%' }}><Button radius={5} onPress={deleteWeight}>Delete</Button></View>) : null}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Statistics

const styles = StyleSheet.create({
    StatisticsContainer: {
        borderColor: '#0003',
        borderWidth: 1,
        borderRadius: 8,
        padding: 4,
    },
    card: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        marginBottom: 20,
        borderRadius: 8,
        elevation: 6,
        rowGap: 20,
        backgroundColor: theme.colors.background,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    circlBar: {
        width: 10,
        height: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
    },
    modal: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
        elevation: 4,
        width: "80%",
        borderRadius: 6,
    },
    input: {
        backgroundColor: theme.colors.statusBar,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginTop: 24,
        marginBottom: 12,
        paddingVertical: 6,
        marginVertical: 8,
        fontSize: 15
    }
});