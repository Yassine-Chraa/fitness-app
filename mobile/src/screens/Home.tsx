import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Modal, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import Swiper from 'react-native-swiper';
import Screen from '../components/Screen';
import theme from '../constants/theme';
import { useAuth } from '../context/providers/AuthContextProvider';
import { Button } from '@rneui/base';
import axios from '../Helpers/axiosConfig'
import { useDailyNutrition } from '../context/providers/DailyNutritionProvider';

function Home(): JSX.Element {
  const { currentUser, getUserWeights, weights, addUserWeight, editUserWeight, deleteUserWeight } = useAuth();
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
    var dob = new Date(currentUser?.user?.birth_date);
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
        height: '180',
        weight: '70',
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
  const fetchData1 = async () => {
    await getDailyCalory();
    await getUserWeights(currentUser!.user!.id);
  }
  const fetchData2 = async () => {
    await getDailyNutrition(currentUser!.user!.id, now);
    await getLastNutritions(currentUser!.user!.id);
  }
  const addWeight = async () => {
    if (currentUser) {
      try {
        await addUserWeight(currentUser!.user!.id, Number(weight), now);
        setWeight('')
        setShowModal(false);
        fetchData()
      } catch (e) {
        console.log(e)
      }
    }
  }
  const editWeight = async () => {
    if (currentUser) {
      try {
        await editUserWeight(currentUser!.user!.id, Number(weight), now);
        setWeight('')
        setShowModal(false);
        fetchData()
      } catch (e) {
        console.log(e)
      }
    }
  }
  const deleteWeight = async () => {
    try {
      await deleteUserWeight(currentUser!.user!.id, now);
      setWeight('')
      setShowModal(false);
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setCurrentDate()
    fetchData1()
  }, [axios.defaults.headers.common[
    "authorization"
  ]])
  useEffect(() => {
    const temp = weights?.find(weight => {
      return weight.date === now;
    });
    setEditMode(temp ? true : false);
  }, [weights])
  useEffect(() => {
    fetchData2()
  }, [axios.defaults.headers.common[
    "authorization"
  ], forceUpdate])
  return (
    <Screen name="Fitness App" allowScroll>
      <View>
        <View style={styles.card}>
          <View>
            <Text style={styles.subtitle}>Calories (cal)</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PieChart
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
                {
                  name: 'Rest',
                  calories: (BMR - dailyNutrition?.energy_consumed) | 0,
                  color: theme.colors.statusBar,
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
                  labels: weights.length != 0 ? weights.map((weight) => {
                    const temp = new Date(weight.date);
                    const date = `${temp.getDay() < 10 ? '0' : ''}${temp.getDate()}/${temp.getMonth() < 9 ? '0' : ''}${temp.getMonth() + 1}`
                    return date;
                  }) : ['01/01'],
                  datasets: [
                    {
                      data: weights.length != 0 ? weights.map((weight) => {
                        return weight.value;
                      }) : [70],
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
            <Text style={styles.subtitle}>Energy expended</Text>
            <View>
              <BarChart
                data={{
                  labels: lastNuritions?.map((item) => {
                    return `${item.date.substring(8, 10)}/${item.date.substring(5, 7)}`;
                  }),
                  datasets: [
                    {
                      data: lastNuritions?.map((item) => {
                        return item.energy_consumed;
                      }),
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
            <TextInput keyboardType="numeric" placeholder='weight (kg)' style={styles.input} value={weight} inputMode={"numeric"} onChangeText={setWeight} />
            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
              <View style={{ width: editMode ? '40%' : '100%' }}><Button radius={5} onPress={() => editMode ? editWeight() : addWeight()}>{editMode ? "Edit" : "Add"}</Button></View>
              {editMode ? (<View style={{ width: '40%' }}><Button radius={5} onPress={deleteWeight}>Delete</Button></View>) : null}
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '500',
  },
  textMore: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
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

export default Home;
